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
  console.log(cityForm);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityForm}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response);
  let mainTemperature = document.querySelector("#mainTemperature");
  let temperature = Math.round(response.data.main.temp);
  mainTemperature.innerHTML = `${temperature}`;
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", newLocation);
