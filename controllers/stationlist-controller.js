import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const stationlistController = {
  async index(request, response) {
    const getIcon = (weatherCode) => {
      if (weatherCode >= 200 && weatherCode <= 232) {
        return "11d";
      }
    };
    const station = await stationStore.getStationById(request.params.id);
    const lastReport = station.reports[station.reports.length - 1];
    const arrayTemp = station.reports.map((x) => Number(x.temp));
    const minTemp = Math.min(...arrayTemp);
    const maxTemp = Math.max(...arrayTemp);
    const weatherIcon = getIcon(lastReport.code);

    const viewData = {
      station,
      stationSummary: { ...lastReport, minTemp, maxTemp, weatherIcon },
    };

    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: request.body.code,
      temp: request.body.temp,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
      windDirection: request.body.windDirection,
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
