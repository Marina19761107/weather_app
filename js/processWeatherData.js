const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function processWeatherData(weatherData) {
  const today = new Date();
  // getDay() returns the day of the week (from 0 to 6) of a date.
  const currentDayIndex = today.getDay();

  const processedData = {};

  // Get all city keys that end with _daily
  const cityKeys = Object.keys(weatherData)?.filter((key) =>
    key.endsWith("_daily")
  );

  cityKeys.forEach((cityKey) => {
    const cityName = cityKey.replace("_daily", "");
    const cityData = weatherData[cityKey].daily;

    processedData[cityName] = {};

    cityData.time.forEach((_, index) => {
      // Calculate the day index, wrapping around if needed
      const dayIndex = (currentDayIndex + index) % 7;
      const dayName = weekDays[dayIndex];

      processedData[cityName][dayName.toLowerCase()] = {
        time: dayName,
        maxTemp: cityData.temperature_2m_max[index],
        minTemp: cityData.temperature_2m_min[index],
        weatherCode: cityData.weather_code[index],
        currentWindSpeed: cityData.wind_speed_10m_max[index],
        maxWindSpeed: cityData.wind_gusts_10m_max[index],

        rightNowTemp: calculateMedian(
          cityData.temperature_2m_min[index],
          cityData.temperature_2m_max[index]
        ),
      };
    });
  });

  return processedData;
}

function getCurrentDay() {
  const today = new Date();
  // getDay() returns the day of the week (from 0 to 6) of a date.
  const currentDayIndex = today.getDay();
  return weekDays[currentDayIndex].toLowerCase();
}

function calculateMedian(min, max) {
  const arr = generateArray(min, max);
  const length = arr.length;
  const middle = Math.floor(length / 2);
  // Check if the array length is even or odd
  if (length % 2 === 0) {
    // If even, return the average of middle two elements
    return (arr[middle - 1] + arr[middle]) / 2;
  } else {
    // If odd, return the middle element
    return arr[middle];
  }
}

function generateArray(min, max) {
  let array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }

  return array;
}
