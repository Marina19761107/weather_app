import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    station.latitude = station.latitude;
    station.longitude = station.longitude;

    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    if (list) {
      list.reports = await reportStore.getReportsByStationId(list._id);
    }
    return list;
  },

  async getStationsByUserId(userid) {
    await db.read();
    const userStations = db.data.stations.filter(
      (station) => station.userid === userid
    );

    // Load reports for each station
    for (const station of userStations) {
      station.reports = await reportStore.getReportsByStationId(station._id);
    }

    return userStations;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    if (index !== -1) {
      db.data.stations.splice(index, 1);
      await db.write();
    }
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
};
