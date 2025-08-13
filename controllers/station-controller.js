import axios from "axios";
import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { accountsController } from "./accounts-controller.js";
import { summarizeStationWeather } from "../utils/weather-summary.js";

export const stationController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);
    const stationsWithSummary = stations.map((station) => ({
      ...station,
      summary: summarizeStationWeather(station),
    }));

    stationsWithSummary.sort((a, b) => a.title.localeCompare(b.title));

    const viewData = {
      title: "Create new station",
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
    response.redirect("/dashboard");
  },

  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },

  async updateStationDetails(request, response) {
    const stationId = request.params.id;

    const updatedData = {
      title: request.body.title,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
    };

    await stationStore.updateStationDetails(stationId, updatedData);
    response.redirect(`/station/${stationId}`);
  },
};
