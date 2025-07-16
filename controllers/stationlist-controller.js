import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { summarizeStationWeather } from "../utils/weather-summary.js";
import { accountsController } from "./accounts-controller.js";
import { formatDate } from "../utils/formatDate.js";
import dayjs from "dayjs";

export const stationlistController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stationId = request.params.id;
    const station = await stationStore.getStationById(stationId);

    station.reports.forEach((report) => {
      report.createdAtFormatted = formatDate(report.createdAt);
    });

    const stationWithSummary = {
      ...station,
      summary: summarizeStationWeather(station),
    };

    const viewData = {
      title: "Station Details",
      station: stationWithSummary,
      loggedInUser,
    };

    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: request.body.windDirection,
      description: request.body.description,
      userid: loggedInUser._id,
      createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };

    console.log(`adding report ${newReport.title}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;

    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },
};
