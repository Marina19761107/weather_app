import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const stationlistController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
console.log("rendering new report");
    let report = {};
    const lat = request.body.lat;
    const lng = request.body.lng;
    const latLongRequestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=71d7cc3d2690016435b982c9101bd14b`;
    const result = await axios.get(latLongRequestUrl);
    console.log(latLongRequestUrl);
    if (result.status == 200) {
      const currentWeather = result.data;
      report.code = currentWeather.weather[0].id;
      report.temperature = currentWeather.main.temp;
      report.windSpeed = currentWeather.wind.speed;
      report.pressure = currentWeather.main.pressure;
      report.windDirection = currentWeather.wind.deg;
    }

    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report,
    };
    response.render("station-view", viewData);
  },


  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;

    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  }
};