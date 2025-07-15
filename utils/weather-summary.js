export function getWeatherIcon(code) {
  if (code >= 200 && code <= 232) return "11d";
  if (code >= 300 && code <= 321) return "09d";
  if (code >= 500 && code <= 531) return "10d";
  if (code >= 600 && code <= 622) return "13d";
  if (code >= 700 && code <= 781) return "50d";
  if (code === 800) return "01d";
  if (code >= 801 && code <= 804) return "03d";
  return "na";
}

export function summarizeStationWeather(station) {
  const reports = station.reports || [];

  if (reports.length === 0) {
    return {
      latestReport: null,
      minTemp: null,
      maxTemp: null,
      weatherIcon: null,
      pressure: null,
      windSpeed: null,
      windDirection: null,
    };
  }

  const latestReport = reports[reports.length - 1];
  const temps = reports.map((r) => Number(r.temp));
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const weatherIcon = getWeatherIcon(latestReport.code);

  return {
    latestReport,
    minTemp,
    maxTemp,
    weatherIcon,
    pressure: latestReport.pressure,
    windSpeed: latestReport.windSpeed,
    windDirection: latestReport.windDirection,
  };
}
