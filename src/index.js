let now = new Date();

let currentTime = document.querySelector("#currentTime");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

function newLocation(event) {
  event.preventDefault();
  let apiKey = "7d478f69e1b2f5d563653f13f5f91d76";
  let cityForm = document.querySelector("#exampleInputEmail1").value;
  let city = document.querySelector("#city");
  city.innerHTML = cityForm;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityForm}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let mainTemperature = document.querySelector("#mainTemperature");
  mainTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#mainTemperature");
  mainTemperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let mainTemperature = document.querySelector("#mainTemperature");
  let temperature = Math.round(response.data.main.temp);
  mainTemperature.innerHTML = `${temperature}`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", newLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);
