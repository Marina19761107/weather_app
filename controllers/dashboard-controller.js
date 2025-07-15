import axios from "axios";
import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { summarizeStationWeather } from "../utils/weather-summary.js";

const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tramore,Ireland&units=metric&appid=71d7cc3d2690016435b982c9101bd14b`;

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    //get all stations owned by the user
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    //Add summary info to each station
    const stationsWithSummary = stations.map((station) => ({
      ...station,
      summary: summarizeStationWeather(station),
    }));

    //Sort alfabeticly by station title
    stationsWithSummary.sort((a, b) => a.title.localeCompare(b.title));

    const viewData = {
      title: "Dashbord",
      stations: stationsWithSummary,
      loggedInUser,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      userid: loggedInUser._id,
    };
    const savedStation = await stationStore.addStation(newStation);

    if (request.body.code) {
      const newReport = {
        code: request.body.code,
        temp: request.body.temp,
        windSpeed: request.body.windSpeed,
        pressure: request.body.pressure,
        windDirection: request.body.windDirection,
      };
      await reportStore.addReport(savedStation._id, newReport);
    }

    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};
