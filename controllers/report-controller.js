import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { summarizeStationWeather } from "../utils/weather-summary.js";
import { accountsController } from "./accounts-controller.js";
import { formatDate } from "../utils/formatDate.js";
import dayjs from "dayjs";
import axios from "axios";

const apiKey = "71d7cc3d2690016435b982c9101bd14b";

export const reportController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stationId = request.params.id;
    const station = await stationStore.getStationById(stationId);

    station.reports.forEach((report) => {
      report.createdAtFormatted = formatDate(report.createdAt);
    });

    const sortedReports = [...station.reports].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const lastReport = sortedReports.length > 0 ? sortedReports[0] : null;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${station.latitude}&lon=${station.longitude}&units=metric&appid=${apiKey}`;
    const forecastResult = await axios.get(forecastUrl);
    const forecastList = forecastResult.data.list;

    const maxItems = Math.min(10, forecastList.length);
    const tempTrend = [];
    const trendLabels = [];

    for (let i = 0; i < maxItems; i++) {
      tempTrend.push(forecastList[i].main.temp);
      const formattedLabel = dayjs(forecastList[i].dt_txt).format(
        "YYYY-MM-DD HH:mm"
      );
      trendLabels.push(formattedLabel);
    }
    const stationWithSummary = {
      ...station,
      summary: summarizeStationWeather(station),
    };

    const viewData = {
      title: "Station Details",
      station: stationWithSummary,
      reports: station.reports,
      loggedInUser,
      tempTrend,
      trendLabels,
      lastReport,
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

  async editReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;

    const station = await stationStore.getStationById(stationId);
    const report = await reportStore.getReportById(reportId);

    const viewData = {
      title: "Update report details",
      station,
      report,
    };

    response.render("station-view", viewData);
  },

  async updateReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const updatedReport = {
      code: Number(request.body.code),
      temp: Number(request.body.temp),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: request.body.windDirection,
    };
    console.log(`Updating Report ${reportId} from Station ${stationId}`);
    await reportStore.updateReport(reportId, updatedReport);
    response.redirect("/station/" + stationId);
  },
};
