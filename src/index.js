let now = new Date();

let currentTime = document.querySelector("#currentTime");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
            <div class="col-2 days">
              <img src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="${
          forecastDay.weather[0].description
        }" width="60px" />
              <div class="weather-forecast-temperatures">
              <span class="temperature-max"> ${Math.round(
                forecastDay.temp.max
              )} </span>
              /
             <span class="temperature-min"> ${Math.round(
               forecastDay.temp.min
             )}  </span>
              </div>
            <div class="weather-forecast-date">
            ${formatDay(forecastDay.dt)}
            </div>
           </div>  
           `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  console.log(response.data);
  celsiusTemperature = response.data.main.temp;
  let mainTemperature = document.querySelector("#mainTemperature");
  let temperature = Math.round(response.data.main.temp);
  mainTemperature.innerHTML = `${temperature}`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].main;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function newLocation(event) {
  event.preventDefault();
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let cityForm = document.querySelector("#exampleInputEmail1").value;
  let city = document.querySelector("#city");
  city.innerHTML = cityForm;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityForm}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showCelsius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#mainTemperature");
  mainTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", newLocation);

search("Zagreb");
