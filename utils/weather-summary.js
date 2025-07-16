export function getWeatherIcon(code) {
  if (code >= 200 && code <= 232) return "11d";
  if ((code >= 300 && code <= 321) || (code >= 520 && code <= 531))
    return "09d";
  if (code >= 500 && code <= 504) return "10d";
  if ((code >= 600 && code <= 622) || code === 511) return "13d";
  if (code >= 701 && code <= 781) return "50d";
  if (code === 800) return "01d";
  if (code === 801) return "02d";
  if (code === 802) return "03d";
  if (code >= 803 && code <= 804) return "04d";
  return "na";
}

export function summarizeStationWeather(station) {
  const reports = station.reports || [];

  if (reports.length === 0) {
    return {
      latestReport: "N/A",
      minTemp: "N/A",
      maxTemp: "N/A",
      weatherIcon: "na",
      weatherDescription: "N/A",
      pressure: "N/A",
      windSpeed: "N/A",
      windDirection: "N/A",
    };
  }

  const latestReport = reports[reports.length - 1];
  const temps = reports.map((r) => Number(r.temp));
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const weatherIcon = getWeatherIcon(latestReport.code);
  const weatherDescription = latestReport.description || "N/A";

  return {
    latestReport,
    minTemp,
    maxTemp,
    weatherIcon,

    pressure: latestReport.pressure,
    windSpeed: latestReport.windSpeed,
    windDirection: latestReport.windDirection,
    weatherDescription: latestReport.description,
  };
}
