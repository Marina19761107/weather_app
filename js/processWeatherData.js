// Array containing the names of the days of the week, starting from Sunday
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//this function processes and updates the weather for each city daily,
//extracting relevant details from the provided data array.
function processWeatherData(weatherData) {
  const today = new Date();
  // get the current day index(from 0 to 6) 
  const currentDayIndex = today.getDay();

  const processedData = {};

  // filter keys that end with "_daily" to identify cities with daily forecast data
  const cityKeys = Object.keys(weatherData)?.filter((key) =>
    key.endsWith("_daily")
    );
//loop through each city and process the weather data
  cityKeys.forEach((cityKey) => {
    //remove "_daily" to get the actual city name
    const cityName = cityKey.replace("_daily", "");
    //accessing the actual weather data
    const cityData = weatherData[cityKey].daily;
//store weather information for current city
    processedData[cityName] = {};

//looping through the daily forecast data
    cityData.time.forEach((_, index) => {
      // Calculate the current day of the week, starting from today
      const dayIndex = (currentDayIndex + index) % 7;
      const dayName = weekDays[dayIndex];

//store the extracted and calculated weather information by day
      processedData[cityName][dayName.toLowerCase()] = {
        time: dayName,
        maxTemp: cityData.temperature_2m_max[index],
        minTemp: cityData.temperature_2m_min[index],
        currentWindSpeed: cityData.wind_speed_10m_max[index],
        maxWindSpeed: cityData.wind_gusts_10m_max[index],
      };
    });
  });
//return the structured weather data for all cities
  return processedData;
}
//This function returns the current day of the week 
function getCurrentDay() {
  const today = new Date();
  // get the current day index

  const currentDayIndex = today.getDay();
  console.log(currentDayIndex)
  //convert the day name to lowercase and return 
  return weekDays[currentDayIndex].toLowerCase();
}


