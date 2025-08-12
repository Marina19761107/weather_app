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
      title: "Dashboard",
      stations: stationsWithSummary,
      loggedInUser,
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  async autoGenerateReport(request, response) {
    try {
      const stationId = request.params.id;
      const station = await stationStore.getStationById(stationId);

      if (!station) {
        return response.status(404).send("Station not found");
      }

      const lat = station.latitude;
      const lon = station.longitude;
      const apiKey = "71d7cc3d2690016435b982c9101bd14b";
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      const result = await axios.get(weatherUrl);

      if (result.status === 200) {
        const data = result.data;
        const newReport = {
          code: data.weather[0].id,
          description: data.weather[0].description,
          temp: data.main.temp,
          windSpeed: data.wind.speed,
          pressure: data.main.pressure,
          windDirection: data.wind.deg,
          createdAt: new Date(),
        };

        await reportStore.addReport(stationId, newReport);
      }

      response.redirect(`/station/${stationId}`);
    } catch (error) {
      console.error("Error generating report:", error);
      response.status(500).send("Error generating report");
    }
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
