import { v4 } from "uuid"; // imports the v4 function from the uuid library in JavaScript/Node.js.,(Universally Unique Identifiers)
import { initStore } from "../utils/store-utils.js";

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

  async updateStationDetails(id, updatedData) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);
    if (station) {
      station.title = updatedData.title;
      station.latitude = updatedData.latitude;
      station.longitude = updatedData.longitude;
      await db.write();
    }
  },
};
