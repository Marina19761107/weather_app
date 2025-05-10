document.addEventListener("DOMContentLoaded", () => {
  //get the city parameter from URL
  let cityName = new URLSearchParams(window.location.search).get("city"); 
  //call the function to update the weather information
  updateWeather(cityName);
  //main function to update the weather information
  function updateWeather(cityName) {
    const cityData = processWeatherData(weatherData);
    const currentCity = cityName;
    const currentDay = getCurrentDay();
    const currentCityData = cityData[currentCity][currentDay];

    //elements that need to be updated
    const time = document.getElementById("time");
    const rightNowTemp = document.getElementById("rightNowTemp");
    const tempMax = document.getElementById("tempMax");
    const currentWindSpeed = document.getElementById("currentWindSpeed");
    const maxWindSpeed = document.getElementById("maxWindSpeed");
    const city = document.getElementById("cityName");

    //format the current date using Day.js and display it
    const formattedDate = dayjs().format('dddd,<br> MMMM D, YYYY</br>'); 
    time.innerHTML = formattedDate;

    //get hourly weather data for the selected city from the weather data
    const hourlyData = weatherData[cityName + "_hourly"]?.hourly;
    let liveRightNowTemp = null;
    //condition statement (check if hourly weather data exist)
    if (hourlyData) {
      //get the current date and time using days
      const now = dayjs();
      //get the current hour in 24-hour format
        const currentHour = now.hour(); // 0–23
        //format the time key for today's temperature data
        const timeKey = `TodayT${String(currentHour).padStart(2, "0")}:00`;
        const indexOfCurrentHour = hourlyData.time.indexOf(timeKey);
        //if the current hour's temperature is found in the hourly data
        if (indexOfCurrentHour !== -1) {
          //get the live temperature for the current hour
          liveRightNowTemp = hourlyData.temperature_2m[indexOfCurrentHour];
        }
      }

     // Conditional expression to update the "right temperature"
    // If live temperature data exists, update with the live temperature
      rightNowTemp.innerHTML = liveRightNowTemp !== null
      ? `${liveRightNowTemp}°C`
    // If no live temperature data is found, fallback to the default temperature
      : `${currentCityData.rightNowTemp}°C`;
    //updating temperature and wind speed on the page
      tempMax.innerHTML = currentCityData.maxTemp + "°C";
      currentWindSpeed.innerHTML = currentCityData.currentWindSpeed + " km/h";
      maxWindSpeed.innerHTML = currentCityData.maxWindSpeed + " km/h";
      city.innerHTML = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);

      // Weekly forecast cards
      const weeklyWeatherContainer = document.getElementById("weeklyWeatherContainer");
      //update the elements that shows city name
      weeklyWeatherContainer.innerHTML = "";
     //loop through each day's weather data in the current city's weather information
      Object.entries(cityData[currentCity]).forEach(([dayKey, dayData]) => {
    //create a new div for the each box of each day
        const dayWeatherBox = document.createElement("div");
        dayWeatherBox.className = "column is-2";
        dayWeatherBox.innerHTML = `
          <section class="card has-background-black has-text-white">
            <div class="card-header">
              <p class="card-header-title is-size-3 is-flex is-justify-content-center has-text-white">
                ${dayData.time}
              </p>
            </div>
            <div class="card-image has-text-centered">
              <figure class="image is-128x128 is-inline-block">
                <img src="/images/sun.png" alt="Sun Icon" />
              </figure>
            </div>
            <div class="card-footer" style="border-top: none">
              <p class="card-footer-item has-text-left" style="border: none">
                <span class="is-size-5 has-text-white">${dayData.maxTemp}°C</span>
              </p>
              <p class="card-footer-item has-text-right" style="border: none">
                <span class="is-size-5 has-text-white">${dayData.minTemp}°C</span>
              </p>
            </div>
          </section>
        `;
        weeklyWeatherContainer.appendChild(dayWeatherBox);
      });
    }
  });