const apiKey = "eeedf5b379e04d670399db6116a6549a";
const inputElement = document.getElementById("inputElement");
const iconSrc = document.getElementById("iconSrc");
const mainContainer = document.querySelector(".main-container");
const cityName = inputElement.value;
const weaklyForecast = document.querySelector(".weekly-forecast-element");
const dayForecast = document.querySelector(".day-forecast");
const loaderEl = document.querySelector(".loader");

function toggleSkeleton(loading) {
  if (loading) {
    loaderEl.style.display = "block";
  } else {
    loaderEl.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.getElementById("date");
  setDate(dateElement);
});

function setDate(dateElement) {
  const date = new Date();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = monthsOfYear[date.getMonth()];

  const formattedDate = `${dayOfWeek}, ${day} ${month}`;
  dateElement.textContent = formattedDate;
}

async function fetchWeather(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  let isLoading = true;
  toggleSkeleton(isLoading);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      toggleSkeleton(false);
      renderWeatherData(data);
    })
    .catch((error) => {
      toggleSkeleton(false);
      Toastify({
        text: "No matches found",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
    });
}

function renderWeatherData(data) {
  const celsius = (data.main.temp - 273.15).toFixed(1);
  let iconSrc;
  const header = document.getElementsByTagName("header")[0];

  switch (data.weather[0].main) {
    case "Clouds":
      iconSrc = "src/clouds.png";
      mainContainer.style.backgroundImage =
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";

      header.style.backgroundImage =
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";

      break;

    case "Clear":
      iconSrc = "src/sunny.png";
      mainContainer.style.backgroundImage =
        "linear-gradient(to top, #f9d423 0%, #ff4e50 100%)";
      header.style.backgroundImage =
        "linear-gradient(180deg, #f9d423 0%, #ff4e50 0%)";

      break;

    case "Rain":
      iconSrc = "src/rainy.png";
      mainContainer.style.backgroundImage =
        "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
      header.style.backgroundImage =
        "linear-gradient(to bottom, #30cfd0 0%, #330867 0%)";
      break;

    case "Drizzle":
      iconSrc = "src/drizzle.png";
      mainContainer.style.backgroundImage =
        "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)";
      header.style.backgroundImage =
        "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)";
      break;

    case "Mist":
      iconSrc = "src/mist.png";
      mainContainer.style.backgroundImage =
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";
      header.style.backgroundImage =
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";
      break;
    default:
      alert("Error");
  }

  mainContainer.innerHTML = `
    <p id="date"></p>
          <p class="name">${data.name}</p>
          <img src="${iconSrc}" alt="icon-weather" />
          <h1>${celsius}°</h1>
          <p class="description">${data.weather[0].description}</p>

           <div class="widgets-weather">
            <div class="weather-div">
              <div>
                <p class="element">${data.wind.speed} km/h</p>
                <p class="element-weather">Wind</p>
              </div>
              <div>
                <p class="element">${data.main.pressure} mbar</p>
                <p class="element-weather">Pressure</p>
              </div>
              <div>
                <p class="element">${data.main.humidity}%</p>
                <p class="element-weather">Humidity</p>
              </div>
            </div>
          </div>
    `;

  const dateElement = document.getElementById("date");
  setDate(dateElement);
}

async function getForecastWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&cnt=56`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const forecastData = data.list;

      weaklyForecast.innerHTML = "";

      for (let i = 0; i < forecastData.length; i += 12) {
        const forecast = forecastData[i];
        const date = new Date(forecast.dt * 1000);

        displayForecastWeather(date, forecast);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayForecastWeather(date, forecast) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("contener-forecast");
  weatherDiv.innerHTML = `
  <p class="weatherDivDays">${dayOfWeek}</p>
  <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="icon">
  <p class="temp">${forecast.main.temp}°C</p>
  
`;
  weaklyForecast.appendChild(weatherDiv);
}

inputElement.addEventListener("keyup", async function (event) {
  const cityName = inputElement.value;
  if (event.key === "Enter") {
    event.preventDefault();
    await fetchWeather(cityName);
    await getForecastWeatherData(cityName);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const forecastContainer = document.querySelector(".weekly-forecast-element");

  let isDown = false;
  let startX;
  let scrollLeft;

  forecastContainer.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - forecastContainer.offsetLeft;
    scrollLeft = forecastContainer.scrollLeft;
  });

  forecastContainer.addEventListener("mouseleave", () => {
    isDown = false;
  });

  forecastContainer.addEventListener("mouseup", () => {
    isDown = false;
  });

  forecastContainer.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - forecastContainer.offsetLeft;
    const walk = (x - startX) * 3;
    forecastContainer.scrollLeft = scrollLeft - walk;
  });
});

function onClickMenu() {
  document.querySelector(".slide").classList.toggle("open");
  document.getElementById("nav").classList.toggle("show");
}

function displayRandomWeather() {
  const locations = [
    "Londyn",
    "Tokio",
    "Paris",
    "Poland",
    "Spain",
    "Portugal",
    "Nepal",
  ];
  const randomCity = locations[Math.floor(Math.random() * locations.length)];
  fetchWeather(randomCity);
  getForecastWeatherData(randomCity);
}

document.addEventListener("DOMContentLoaded", displayRandomWeather);
