function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value;

  // Current weather API call
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5da7ac694ad2291c111aa708a06237b4`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      displayWeather(data);
      getForecast(cityName);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function getForecast(cityName) {
  // Forecast API call
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=5da7ac694ad2291c111aa708a06237b4`
  )
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = "";

  if (data.cod === "404") {
    weatherInfo.innerHTML = "<p>City not found</p>";
  } else {
    const cityName = data.name;
    const date = new Date().toDateString();
    const weather = data.weather[0].description;
    const temperature = Math.round(data.main.temp - 273.15);
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    const html = `
        <h2>${cityName}</h2>
        <p>Date: ${date}</p>
        <p>Weather: ${weather} <img src="${iconUrl}" alt="${weather} icon"></p>
        <p>Temperature: ${temperature}°C</p>
      `;

    weatherInfo.innerHTML = html;
  }
}

function displayForecast(data) {
  const weatherInfo = document.getElementById("weatherInfo");

  if (data.cod === "404") {
    weatherInfo.innerHTML += "<p>Forecast data not available</p>";
  } else {
    const cityName = data.city.name;
    const forecastList = data.list;

    let html = `<h2>${cityName} Forecast</h2>`;

    forecastList.forEach((item) => {
      const dateTime = item.dt_txt;
      const date = new Date(dateTime);
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const weather = item.weather[0].description;
      const temperature = Math.round(item.main.temp - 273.15);
      const iconCode = item.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

      html += `
          <div class="forecast-item">
            <p>Date: ${date.toDateString()}</p>
            <p>Time: ${time}</p>
            <p>Weather: ${weather} <img src="${iconUrl}" alt="${weather} icon"></p>
            <p>Temperature: ${temperature}°C</p>
          </div>
        `;
    });

    weatherInfo.innerHTML += html;
  }
}