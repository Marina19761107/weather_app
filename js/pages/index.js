document.addEventListener('DOMContentLoaded', function () {
  //call the getCurrentDay function to get today's day name
  const today = getCurrentDay();
  //call the processWeatherData function to structure the weather data by city and day
  const processedData = processWeatherData(weatherData);

//list of cities to display weather data for
  const cities = ['berlin', 'amsterdam', 'paris', 'tromso', 'cork', 'copenhagen'];

//loop through each city and update the temperature values on the page
  cities.forEach(city => {
    const cityToday = processedData[city]?.[today];
    if (cityToday) {
      //update the max temperature element
      document.getElementById(city + 'TempMax').textContent = cityToday.maxTemp + "°C";
      //update the min temperature element
      document.getElementById(city + 'TempMin').textContent = cityToday.minTemp + "°C";
    }
  });
//set the title of the dashboard section
  document.getElementById("dashboardTitle").textContent = "Dashboard";
//set the title for the today's weather section
  document.getElementById("todayTitle").textContent = "Today";
});