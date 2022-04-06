const cityToFind = document.getElementById("cityInput");
const temperature = document.getElementById("mainTemp");
const min = document.getElementById("min");
const max = document.getElementById("max");
const feelsLike = document.getElementById("temp-like");
const humidity = document.getElementById("humid");
const windSpeed = document.getElementById("wind");
const visibility = document.getElementById("visible");
const city = document.getElementById("city");
const homeButton = document.getElementById("homeButton");
const search = document.getElementById("search");
const day = document.getElementById("day");
const time = document.getElementById("time");
const weatherSpot = document.getElementById("weather");

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday", 
];

const getWeatherDetails = (city) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4f81b546dde0fec65e030178e52f5207`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let temp = Math.round(data.main.temp);
      let minTemp = Math.floor(data.main.temp_min);
      let maxTemp = Math.ceil(data.main.temp_min);
      let tempLike = Math.round(data.main.feels_like);
      temperature.innerHTML = `${temp}&#176;c`;
      min.innerHTML = `${minTemp}&#176;`;
      max.innerHTML = `${maxTemp}&#176;`;
      feelsLike.innerHTML = `${tempLike}&#176;`;
      return data;
    })
    .then((data) => {
      let humid = data.main.humidity;
      humidity.innerText = humid + "%";
      return data;
    })
    .then((data) => {
      let wind = data.wind.speed;
      windSpeed.innerText = wind + "km/h";
      return data;
    })
    .then((data) => {
      let visible = data.visibility / 100;
      visibility.innerText = visible + "m";
      let cloudCover = data.clouds.all;
      cloud.innerText = cloudCover + "%";
      let weather = data.weather[0].main;
      let desc = data.weather[0].description;
      weatherSpot.innerText = weather + " " + desc;
    })
    .catch(error => {
      alert("There was an error\n\nPlease try again.");
      cityToFind.value = "ERROR";
  })

}

// Day & Time of the day
const months = [
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
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const dayOfWeek = document.getElementById("weekday");
const dayOfMonth = document.getElementById("month");

function findCityByName(city) {
  let url = `https://timezone.abstractapi.com/v1/current_time/?api_key=92ae9a312554484b8f0fbee9d7b6d534
&location=${city}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let today = new Date();
      today = weekday[today.getDay()];
      // day.innerText = `${today}`;
      dayOfWeek.innerText = today + ",";
      return data.datetime;
    })
    .then((dateAndTime) => {
      let date = dateAndTime.split(" ")[0];
      let day = date.split("-")[2];
      let dateValue = date.split("-")[1];
      dayOfMonth.innerHTML = `${day}<sup>th</sup> ${months[dateValue - 1]}`;
      return dateAndTime;
    })
    .then((dateAndTime) => {
      let widget = dateAndTime.split(" ")[1];
      let widgetArr = widget.split(":");
      hour.innerText = widgetArr[0];
      let hourCount = Number(widgetArr[0]);
      minute.innerText = widgetArr[1];
    })
    .catch(error => {
      console.log("There was an error getting city");
      cityToFind.value = "Invalid City Name";
      return;
  })
}

const findCity = () => {
  let cityName = cityToFind.value;
  if (!cityName || cityName.length < 3) {
    cityName = "Sydney";
    cityToFind.value = "Sydney";
  }
  findCityByName(cityName);
  getWeatherDetails(cityName);
}

console.log