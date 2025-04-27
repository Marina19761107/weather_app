const weatherData = {
  berlin_daily: {
    daily: {
      time: ["Today", "Today+1", "Today+2", "Today+3", "Today+4", "Today+5", "Today+6"],
      weather_code: [1, 2, 3, 1, 2, 3, 1],
      temperature_2m_max: [12, 15, 17, 14, 16, 19, 20],
      temperature_2m_min: [6, 7, 9, 8, 10, 11, 13],
      wind_speed_10m_max: [15, 18, 20, 16, 14, 19, 22],
      wind_gusts_10m_max: [33.1, 31.7, 41.0, 32.4, 24.8, 25.2, 25.9],
    }
  },
  amsterdam_daily: {
    latitude: 52.36,
    longitude: 4.82,
    timezone: "GMT",
    daily: {
      time: ["Today", "Today+1", "Today+2", "Today+3", "Today+4", "Today+5", "Today+6"],
      weather_code: [3, 1, 3, 3, 80, 61, 61],
      temperature_2m_max: [8.7, 9.6, 11.4, 7.9, 7.8, 8.1, 10],
      temperature_2m_min: [3.3, 0.9, 2.6, 3.4, 5.7, 5.5, 4.5],
      wind_speed_10m_max: [15, 18, 20, 16, 14, 19, 22],
      wind_gusts_10m_max: [39.2, 42.5, 29.5, 39.2, 27.4, 31.7, 44.6],
    }
  },
  cork_daily: {
    latitude: 40.71,
    longitude: -74.01,
    timezone: "GMT",
    daily: {
      time: ["Today", "Today+1", "Today+2", "Today+3", "Today+4", "Today+5", "Today+6"],
      weather_code: [2, 3, 1, 3, 2, 1, 3],
      temperature_2m_max: [14, 16, 19, 18, 15, 17, 19],
      temperature_2m_min: [9, 11, 13, 10, 12, 13, 14],
      wind_speed_10m_max: [13, 15, 17, 14, 16, 18, 20],
      wind_gusts_10m_max: [58.7, 58.3,55.1, 32.0, 25.2, 34.6, 40.7],
    }
  },
  tromso_daily: {
    latitude: 35.68,
    longitude: 139.76,
    timezone: "Asia/Tokyo",
    daily: {
      time: ["Today", "Today+1", "Today+2", "Today+3", "Today+4", "Today+5", "Today+6"],
      weather_code: [1, 1, 2, 1, 3, 3, 1],
      temperature_2m_max: [22, 24, 26, 25, 23, 21, 27],
      temperature_2m_min: [18, 19, 20, 19, 18, 17, 19],
      wind_speed_10m_max: [10, 12, 14, 13, 15, 16, 12],
      wind_gusts_10m_max: [10.1, 16.2, 25.2, 14.8, 19.8, 31.3, 11.2],
    }
  },
  paris_daily: {
    latitude: 48.85,
    longitude: 2.35,
    timezone: "Europe/Paris",
    daily: {
      time: ["Today", "Today+1", "Today+2", "Today+3", "Today+4", "Today+5", "Today+6"],
      weather_code: [3, 1, 2, 3, 1, 2, 3],
      temperature_2m_max: [12, 14, 16, 15, 14, 13, 12],
      temperature_2m_min: [8, 9, 10, 11, 12, 11, 10],
      wind_speed_10m_max: [10, 12, 14, 13, 15, 16, 17],
      wind_gusts_10m_max: [32.4, 41.0, 52.9, 27.4, 27.4, 26.3, 38.9],
    }
  },
  copenhagen_daily: {
    latitude: 55.67,
    longitude: 12.57,
    timezone: "Europe/Copenhagen",
    daily: {
      time: ["Today", "Today+1", "Today+2", "Today+3", "Today+4", "Today+5", "Today+6"],
      weather_code: [2, 1, 3, 1, 2, 3, 3],
      temperature_2m_max: [9, 10, 12, 11, 13, 14, 15],
      temperature_2m_min: [4, 5, 6, 7, 8, 9, 10],
      wind_speed_10m_max: [18, 16, 14, 15, 13, 18, 20],
      wind_gusts_10m_max: [24.8, 28.4, 54.7, 54.7, 52.2, 44.6,36.7],
    }
  }
};