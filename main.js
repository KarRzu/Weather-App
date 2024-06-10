const apiKey = "eeedf5b379e04d670399db6116a6549a";
const inputElement = document.getElementById("inputElement");
const sectionOne = document.querySelector(".section-1");
const sectionTwo = document.querySelector(".section-2");
const screen = document.querySelector(".screen");
const loaderEl = document.querySelector(".loader");
const forecastsWeather = document.querySelector(".forecastsWeather");
const footer = document.getElementsByTagName("footer")[0];

const cityName = inputElement.value;

async function getWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  isLoading = true;
  toggleSkeleton(isLoading);
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      toggleSkeleton(false);
      displayWeather(data);
    })
    .catch((error) => {
      toggleSkeleton(false);
      footer.style.display = "none";

      Toastify({
        text: "Weather forecast retrieval error",
        duration: 3000,
      }).showToast();
    });
}

function displayWeather(data) {
  const celsius = (data.main.temp - 273.15).toFixed(1);
  let iconSrc;

  switch (data.weather[0].main) {
    case "Clouds":
      iconSrc = "image/clouds.png";
      screen.style.backgroundImage =
        // "linear-gradient(to top, #yourColor1 0%, #yourColor2 100%), radial-gradient(circle, rgba(56, 100, 228, 1) 18%, rgba(129, 82, 158, 1) 100%)";
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";

      break;

    case "Clear":
      iconSrc = "image/sunny.png";
      screen.style.backgroundImage =
        "linear-gradient(to bottom, #f9d423 0%, #ff4e50 100%)";

      break;

    case "Rain":
      iconSrc = "image/rainy.png";
      screen.style.backgroundImage =
        "linear-gradient(to top, #30cfd0 0%, #330867 100%)";
      break;

    case "Drizzle":
      iconSrc = "image/drizzle.png";
      screen.style.backgroundImage =
        "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)";
      break;

    case "Mist":
      iconSrc = "image/mist.png";
      screen.style.backgroundImage =
        "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)";
      break;
    default:
      alert("wystapił błąd");
  }

  sectionOne.innerHTML = `
  <img src="${iconSrc}" alt="icon" />
  <div class="temp">
    <p>${celsius}°C</p>
    <p>${data.weather[0].description}</p>
  </div>
  <div class="detailsWeather">
    <div class="details">
      <p>${data.wind.speed}km/h</p>
      <p>Wind</p>
    </div>
    <div class="details">
      <p>${data.main.pressure} mbar</p>
      <p>Pressure</p>
    </div>
    <div class="details">
      <p>${data.main.humidity}%</p>
      <p>Humidity</p>
    </div>
  </div>
  `;
}

async function getForecastWeatherData(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&cnt=56`;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const forecastData = data.list;

      forecastsWeather.innerHTML = "";

      for (let i = 0; i < forecastData.length; i += 12) {
        const forecast = forecastData[i];
        const date = new Date(forecast.dt * 1000);

        displayForecastWeather(date, forecast);
      }
    })
    .catch((error) => {
      const forecastsWeather = document.querySelector(".forecastsWeather");
      forecastsWeather.textContent = "No matches found";
      Toastify({
        text: "Weather forecast retrieval error",
        duration: 3000,
      }).showToast();
    });
}

function displayForecastWeather(date, forecast) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weatherDiv");
  weatherDiv.innerHTML = `
  <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="icon">
  <p>${forecast.main.temp}°C</p>
  <p class="weatherDivDays">${dayOfWeek}</p>
`;
  forecastsWeather.appendChild(weatherDiv);
}

function toggleSkeleton(loading) {
  if (loading) {
    loaderEl.style.display = "block";
    sectionOne.style.display = "none";
    sectionTwo.style.display = "none";
    footer.style.display = "none";
  } else {
    loaderEl.style.display = "none";
    sectionOne.style.display = "flex";
    sectionTwo.style.display = "block";
    footer.style.display = "flex";
  }
}

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const container = document.querySelector(".container");
const countryList = document.querySelector("#autocomplete-list");

inputElement.addEventListener("keyup", async function (event) {
  const cityName = inputElement.value;
  if (event.key === "Enter") {
    event.preventDefault();
    await getWeatherData(cityName);
    await getForecastWeatherData(cityName);
  }
});

countryList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    inputElement.value = event.target.textContent;
    getWeatherData(inputElement.value);
    getForecastWeatherData(inputElement.value);
    countryList.style.display = "none";
  }
});

function renderResults(results) {
  if (!results.length) {
    return (countryList.style.display = "none");
  }

  let content = results
    .map((item) => {
      return `<li>${item}</li>`;
    })
    .join("");

  countryList.style.display = "block";
  countryList.innerHTML = content;
}

inputElement.addEventListener("keyup", (e) => {
  let results = [];
  let input = inputElement.value;
  if (input.length) {
    results = countries.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });
  }

  renderResults(results);
});

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
  getWeatherData(randomCity);
  getForecastWeatherData(randomCity);
}

document.addEventListener("DOMContentLoaded", displayRandomWeather);
