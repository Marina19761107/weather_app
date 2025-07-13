import axios from "axios";
import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tramore,Ireland&units=metric&appid=71d7cc3d2690016435b982c9101bd14b`;

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "Stations Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id),
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
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
  
  async deleteStation(request, response) {
  const stationId = request.params.id;
  console.log(`Deleting Station ${stationId}`);
  await stationStore.deleteStationById(stationId);
  response.redirect("/dashboard");
  },
};
