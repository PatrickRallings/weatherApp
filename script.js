const searchBtn = document.querySelector(".searchBtn");
const appBottom = document.querySelector("#appBottom");

const loc = document.querySelector("#location");
const date = document.querySelector("#date");
const degreeBtn = document.querySelector("#degreeBtn");

const currentTemp = document.querySelector("#currentTemp");
const currentHigh = document.querySelector("#currentHigh");
const currentLow = document.querySelector("#currentLow");
const currentConditionText = document.querySelector('#currentConditionText')
const currentHumidity = document.querySelector("#humidity");
const currentFeels = document.querySelector("#feelsLike");

const day1Date = document.querySelector("#day1Date");
const day1Range = document.querySelector("#day1Range");
const day1Condition = document.querySelector("#day1Condition");
const day1ConditionText = document.querySelector('#day1ConditionText');

const day2Date = document.querySelector("#day2Date");
const day2Range = document.querySelector("#day2Range");
const day2Condition = document.querySelector("#day2Condition");
const day2ConditionText = document.querySelector('#day2ConditionText');

const day3Date = document.querySelector("#day3Date");
const day3Range = document.querySelector("#day3Range");
const day3Condition = document.querySelector("#day3Condition");
const day3ConditionText = document.querySelector('#day3ConditionText');

let crd = document.querySelectorAll(".crd");
let playing = false;

let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();
let d1 = 0 + String(parseInt(dd) + 1);
let d2 = parseInt(dd) + 2;
let d3 = parseInt(dd) + 3;
// let time = today.getHours() + ":" + today.getMinutes();

today = mm + "/" + dd + "/" + yyyy;
let day1 = mm + "/" + d1;
let day2 = mm + "/" + d2;
let day3 = mm + "/" + d3;

let linkVal;

const backgroundObj = {
  "01d": "https://media3.giphy.com/media/VxbvpfaTTo3le/giphy.gif",
  "01n": "https://thumbs.gfycat.com/ContentJitteryCats-size_restricted.gif",
  "02d":
    "https://bestanimations.com/media/sky/1132213612blue-sky-clouds-gif.gif",
  "02n": "https://thumbs.gfycat.com/ContentJitteryCats-size_restricted.gif",
  "03d":
    "https://bestanimations.com/media/sky/1132213612blue-sky-clouds-gif.gif",
  "03n": "https://c.tenor.com/KoVjgtcsGX4AAAAM/aesthetic-night.gif",
  "04d":
    "https://bestanimations.com/media/sky/1132213612blue-sky-clouds-gif.gif",
  "04n": "https://c.tenor.com/KoVjgtcsGX4AAAAM/aesthetic-night.gif",
  "09d":
    "https://static.wixstatic.com/media/5acbb4_68aecc720ed54b5a89edf655cb6f9f6e~mv2.gif",
  "09n":
    "https://thumbs.gfycat.com/AcceptableThornyHorseshoebat-size_restricted.gif",
  "10d":
    "https://static.wixstatic.com/media/5acbb4_68aecc720ed54b5a89edf655cb6f9f6e~mv2.gif",
  "10n":
    "https://thumbs.gfycat.com/AcceptableThornyHorseshoebat-size_restricted.gif",
  "11d":
    "https://media4.giphy.com/media/DX1vOC6sDgBuU/giphy.gif?cid=ecf05e47o2nnuc4u4pt8ug96ko19g6ek4897mdvg1vfzgmz6&rid=giphy.gif&ct=g",
  "11n":
    "https://thumbs.gfycat.com/AcceptableThornyHorseshoebat-size_restricted.gif",
  "13d":
    "https://i.pinimg.com/originals/3e/1e/11/3e1e11759b1d85c2457103472584a4d2.gif",
  "13n":
    "https://i.pinimg.com/originals/3e/1e/11/3e1e11759b1d85c2457103472584a4d2.gif",
  "50d":
    "http://68.media.tumblr.com/55ab69e8654f7b40c0f6855c8ca22961/tumblr_omjk2lVUt31tliyzbo1_540.gif",
  "50n":
    "http://68.media.tumblr.com/55ab69e8654f7b40c0f6855c8ca22961/tumblr_omjk2lVUt31tliyzbo1_540.gif",
};

const currentFetchF = () => {
  let cityVal = document.querySelector("input").value;
  date.innerHTML = `<em>${today}</em>`;
  if (cityVal === '') {
    linkVal = `q=Charlotte,us`
  }
  else if (parseInt(cityVal) === Number) {
    linkVal = `zip=${cityVal},us`;
  } else {
    linkVal = `q=${cityVal},us`;
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${linkVal}&units=imperial&appid=c459dafd68fb96e886da90dd07f0e224`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      let icon = json.weather[0].icon;
      loc.innerHTML = json.name;
      let backgroundImg = backgroundObj[icon];
      console.log(backgroundImg);
      appBottom.style.backgroundImage = `url('${backgroundImg}')`;
      currentTemp.innerHTML =
        Math.round(json.main.temp) + "<sup style='font-size: 20px;'>℉</sup>";
      currentHigh.innerHTML =
        Math.round(json.main.temp_max) +
        "<sup style='font-size: 15px;'>℉</sup>";
      currentLow.innerHTML =
        Math.round(json.main.temp_min) +
        "<sup style='font-size: 15px;'>℉</sup>";
      document.querySelector(
        "#condition"
      ).src = `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector("#condition").title = json.weather[0].description;
      currentConditionText.innerHTML = `<em>${json.weather[0].description}</em>`;
      currentHumidity.innerHTML = json.main.humidity + "%";
      currentFeels.innerHTML =
        Math.round(json.main.feels_like) +
        "<sup style='font-size: 15px;'>℉</sup>";
      let lat = json.coord.lat
      let lon = json.coord.lon
      fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=imperial&appid=dba94717f4d86654f333b634ebb619f4`
        )
      .then((response) => response.json())
      .then((futJson) => {
      console.log(futJson);
      day1Range.innerHTML = `${Math.round(futJson.daily[1].temp.max)}<sup style='font-size: 10px;'>℉</sup> / ${Math.round(futJson.daily[1].temp.min)}<sup style='font-size: 10px;'>℉</sup>`
      day2Range.innerHTML = `${Math.round(futJson.daily[2].temp.max)}<sup style='font-size: 10px;'>℉</sup> / ${Math.round(futJson.daily[2].temp.min)}<sup style='font-size: 10px;'>℉</sup>`
      day3Range.innerHTML = `${Math.round(futJson.daily[3].temp.max)}<sup style='font-size: 10px;'>℉</sup> / ${Math.round(futJson.daily[3].temp.min)}<sup style='font-size: 10px;'>℉</sup>`
      day1Condition.src = `https://openweathermap.org/img/wn/${futJson.daily[1].weather[0].icon}.png`
      day1ConditionText.innerHTML = `<em>${futJson.daily[1].weather[0].description}</em>`
      day2Condition.src = `https://openweathermap.org/img/wn/${futJson.daily[2].weather[0].icon}.png`
      day2ConditionText.innerHTML = `<em>${futJson.daily[2].weather[0].description}</em>`
      day3Condition.src = `https://openweathermap.org/img/wn/${futJson.daily[3].weather[0].icon}.png`
      day3ConditionText.innerHTML = `<em>${futJson.daily[3].weather[0].description}</em>`
      });
    });
};

const flip = (target) => {
  if (playing) return;
  playing = true;
  anime({
    targets: target,
    scale: [{ value: 1 }, { value: 1.1 }, { value: 1, delay: 250 }],
    rotateY: { value: "+=360", delay: 200 },
    delay: anime.stagger(50),
    easing: "easeInOutSine",
    duration: 1200,
    complete: function (anim) {
      playing = false;
    },
  });
};

currentFetchF();

searchBtn.addEventListener("click", function () {
  flip(crd);
  setTimeout(currentFetchF, 500);
});
