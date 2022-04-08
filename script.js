const searchBtn = document.querySelector(".searchBtn");

const loc = document.querySelector("#location");
const date = document.querySelector("#date");
const degreeBtn = document.querySelector("#degreeBtn");

const currentTemp = document.querySelector("#currentTemp");
const currentHigh = document.querySelector("#currentHigh");
const currentLow = document.querySelector("#currentLow");

const currentHumidity = document.querySelector("#humidity");
const currentFeels = document.querySelector("#feelsLike");

const day1Date = document.querySelector("#day1Date");
const day1Range = document.querySelector("#day1Range");
const day1Condition = document.querySelector("#day1Condition");

const day2Date = document.querySelector("#day2Date");
const day2Range = document.querySelector("#day2Range");
const day2Condition = document.querySelector("#day2Condition");

const day3Date = document.querySelector("#day3Date");
const day3Range = document.querySelector("#day3Range");
const day3Condition = document.querySelector("#day3Condition");

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
let d1 = 0 + String(parseInt(dd) + 1);
let d2 = parseInt(dd) + 2;
let d3 = parseInt(dd) + 3;

today = mm + "/" + dd + "/" + yyyy;
let day1 = mm + "/" + d1;
let day2 = mm + "/" + d2;
let day3 = mm + "/" + d3;

let linkVal;

const currentFetchF = () => {
  let cityVal = document.querySelector("input").value;
  date.innerHTML = today;
  degreeBtn.innerHTML = "Switch to &#176C";
  if (parseInt(cityVal) === Number) {
    linkVal = `zip=${cityVal},us`;
  } else {
    linkVal = `q=${cityVal},us`;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${linkVal}&units=imperial&appid=c459dafd68fb96e886da90dd07f0e224`
  )
    .then((response) => response.json())
    .then((json) => {
      let icon = json.weather[0].icon;
      loc.innerHTML = json.name;
      currentTemp.innerHTML = Math.round(json.main.temp) + "&#176";
      currentHigh.innerHTML = Math.round(json.main.temp_max) + "&#176";
      currentLow.innerHTML = Math.round(json.main.temp_min) + "&#176";
      document.querySelector("#condition").src = `https://openweathermap.org/img/wn/${icon}.png`
      document.querySelector("#condition").title = json.weather[0].description
      currentHumidity.innerHTML = json.main.humidity + "%";
      currentFeels.innerHTML = Math.round(json.main.feels_like) + "&#176";
    });
};

const currentFetchC = () => {
  let cityVal = document.querySelector("input").value;
  date.innerHTML = today;
  degreeBtn.innerHTML = "Switch to &#176F";
  console.log('test1')
  if (parseInt(cityVal) === Number) {
    linkVal = `zip=${cityVal},us`;
  } else {
    linkVal = `q=${cityVal},us`;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${linkVal}&units=metric&appid=c459dafd68fb96e886da90dd07f0e224`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log('test2')
      loc.innerHTML = json.name;
      currentTemp.innerHTML = Math.round(json.main.temp) + "&#176";
      currentHigh.innerHTML = Math.round(json.main.temp_max) + "&#176";
      currentLow.innerHTML = Math.round(json.main.temp_min) + "&#176";
      currentCondition.innerHTML = json.weather[0].main;
      currentHumidity.innerHTML = json.main.humidity + "%";
      currentFeels.innerHTML = Math.round(json.main.feels_like) + "&#176";
    });
};

const forecastFetch = () => {
  let cityVal = document.querySelector("input").value;
  day1Date.innerHTML = day1;
  day2Date.innerHTML = day2;
  day3Date.innerHTML = day3;
  if (parseInt(cityVal) === Number) {
    linkVal = `zip=${cityVal},us`;
  } else {
    linkVal = `q=${cityVal},us`;
  }
  fetch(`https://api.openweathermap.org/data/2.5/forecast?${linkVal}&units=imperial&appid=dba94717f4d86654f333b634ebb619f4`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
    });
};

forecastFetch();

currentFetchF();

searchBtn.addEventListener("click", function () {
  currentFetchF();
});

degreeBtn.addEventListener("click", function () {
  let degreeString = String(degreeBtn.innerHTML)
  console.log(degreeString.charAt(degreeString.length-1));
  if (degreeString == "C") {
    currentFetchC();
  } else {
    currentFetchF();
  }
});
