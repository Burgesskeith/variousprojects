/*  Paddling Calculator for Mooloolaba Beach
    Keith Burgess copyright 2021
    Loads forecast marine weather data from stormglass.io
    Move forward and backward through the data to find acceptable paddling conditions.
    Use Find next paddle to search for the next day with ideal conditions.
*/

document.getElementById("loadingImg").style.display = "none";

const refreshRequested = document.getElementById("refreshBtn");
refreshRequested.addEventListener("click", (e) => {
  document.getElementById("loadingImg").style.display = "block";
  getData();
});

let displayHour = 0;
document.getElementById("searchPaddle").style.display = "none";

const getData = (myData) => {
  const lat = 26.6809;
  const lng = 153.1217;
  const params =
    "airTemperature,windDirection,windSpeed,swellDirection,swellHeight,swellPeriod";

  const apiKey =
    "33daf96e-541f-11ec-be8b-0242ac130002-33daf9dc-541f-11ec-be8b-0242ac130002";
  console.log(apiKey);

  fetch(
    `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
    {
      headers: {
        Authorization: apiKey,
      },
    }
  )
    .then((response) => response.json())
    // Promise.resolve(response) // for accessing stored data file
    .then((myData) => {
      displayData(myData);
      return myData;
    })
    .then((myData) => {
      caculateScore(myData);
      document.getElementById("loadingImg").style.display = "none";
      // document.getElementById("loading").innerText = "";
      document.getElementById("searchPaddle").style.display = "block";
      return myData;
    })
    .then((myData) => {
      goBackForward(myData);
      return myData;
    })
    .then((myData) => {
      findNextPaddle(myData);
      return myData;
    })
    .catch((err) => {
      console.log(`An error occurred loading the data`);
    });
};

const findNextPaddle = (myData) => {
  let findPaddle = document.getElementById("findNextPaddle");
  let foundScore;
  let initialDisplayHour = displayHour + 10;
  let searchTimeframe = displayHour;
  findPaddle.addEventListener("click", (e) => {
    for (let i = displayHour; i <= searchTimeframe + 120; i++) {
      console.log(`Looking... ${i}`);
      displayHour++;
      console.log(`Display hour is now ${displayHour}`);
      foundScore = caculateScore(myData);

      console.log(`Score I found is ${foundScore[0]}`);
      if (foundScore[0] > 79 && foundScore[0] !== NaN) {
        displayData(myData);
        console.log(`Found a Day to Paddle ${foundScore[1]}`);
        console.log(myData);
        return;
      }
    }
    displayHour = initialDisplayHour;
    alert("Nothing in the next 5 days!");
    caculateScore(myData);
    document.getElementById("searchPaddle").style.display = "none";
  });
};

const goBackForward = (myData) => {
  const goBack = document.getElementById("navDayBefore");
  goBack.addEventListener("click", (e) => {
    displayHour--;
    displayData(myData);
    caculateScore(myData);
  });
  const goNext = document.getElementById("navDayNext");
  goNext.addEventListener("click", (e) => {
    displayHour++;
    displayData(myData);
    caculateScore(myData);
  });
};

const toDegrees = (num) => {
  if ((num > 348 && num < 361) || (num >= 0 && num <= 12)) {
    windDirScore = 100;
    swellDirScore = 100;
    return "N";
  } else if (num > 11 && num <= 32) {
    windDirScore = 100;
    swellDirScore = 100;
    return "NNE";
  } else if (num > 33 && num <= 57) {
    windDirScore = 90;
    swellDirScore = 90;
    return "NE";
  } else if (num > 57 && num <= 78) {
    windDirScore = 70;
    swellDirScore = 70;
    return "ENE";
  } else if (num > 78 && num <= 101) {
    windDirScore = 10;
    swellDirScore = 30;
    return "E";
  } else if (num > 101 && num <= 123) {
    windDirScore = 10;
    swellDirScore = 20;
    return "ESE";
  } else if (num > 123 && num <= 146) {
    windDirScore = 40;
    swellDirScore = 70;
    return "SE";
  } else if (num > 146 && num <= 168) {
    windDirScore = 80;
    swellDirScore = 80;
    return "SSE";
  } else if (num > 168 && num <= 191) {
    windDirScore = 90;
    swellDirScore = 90;
    return "S";
  } else if (num > 191 && num <= 212) {
    windDirScore = 100;
    swellDirScore = 100;
    return "SSW";
  } else if (num > 212 && num <= 236) {
    windDirScore = 70;
    swellDirScore = 60;
    return "SW";
  } else if (num > 236 && num <= 259) {
    windDirScore = 20;
    swellDirScore = 30;
    return "WSW";
  } else if (num > 259 && num <= 281) {
    windDirScore = 20;
    swellDirScore = 10;
    return "W";
  } else if (num > 281 && num <= 304) {
    windDirScore = 10;
    swellDirScore = 10;
    return "WNW";
  } else if (num > 304 && num <= 348) {
    windDirScore = 30;
    swellDirScore = 30;
    return "NW";
  } else {
    windDirScore = 90;
    swellDirScore = 90;
    return "N";
  }
};

const displayData = (myData) => {
  // console.log(myData);
  // console.log("Temp: " + myData.hours[displayHour].airTemperature.sg);
  // console.log("Wind Direction: " + myData.hours[displayHour].windDirection.sg);
  // console.log("Wind speed: " + myData.hours[displayHour].windSpeed.sg);
  // console.log(
  //   "Swell Direction: " + myData.hours[displayHour].swellDirection.sg
  // );
  // console.log("Swell Height: " + myData.hours[displayHour].swellHeight.sg);
  // console.log("Swell Period: " + myData.hours[displayHour].swellPeriod.sg);
  let pullTime = new Date(myData.hours[displayHour].time);
  // console.log("Time: " + pullTime);
  // console.log(myData);
  // console.log(`Time before manipulation: ${pullTime}`);
  let timeOfDay = pullTime.getHours();
  document.getElementById("timeOfDay").innerText = `${timeOfDay}:00`;

  let dow = pullTime.getDay();
  switch (dow) {
    case 0:
      dow = "Sun";
      break;
    case 1:
      dow = "Mon";
      break;
    case 2:
      dow = "Tue";
      break;
    case 3:
      dow = "Wed";
      break;
    case 4:
      dow = "Thu";
      break;
    case 5:
      dow = "Fri";
      break;
    case 6:
      dow = "Sat";
      break;
    default:
      dow = "Sun";
  }

  let timeDisplay = `${dow}, ${pullTime.getDate()}/${
    pullTime.getMonth() + 1
  }/${pullTime.getFullYear()}`;
  let timeField = document.getElementById("time");
  timeField.innerText = timeDisplay;

  const temp = `${myData.hours[displayHour].airTemperature.sg} deg C`;
  let tempDisplay = document.getElementById("temp");
  tempDisplay.innerText = temp;

  let windDir = `${myData.hours[displayHour].windDirection.sg}`;
  windDir = toDegrees(windDir, displayHour);
  const windDispl = document.getElementById("windDir");
  windDispl.innerText = windDir;

  const windSpeed = `${(myData.hours[displayHour].windSpeed.sg * 3.6).toFixed(
    1
  )} km/h`;
  let windSp = document.getElementById("windSp");
  windSp.innerText = windSpeed;

  let swellDir = `${myData.hours[displayHour].swellDirection.sg}`;
  swellDir = toDegrees(swellDir);
  let swellDirect = document.getElementById("swellDirect");
  swellDirect.innerText = swellDir;

  const swellHeight = `${myData.hours[displayHour].swellHeight.sg} metres`;
  const swellH = document.getElementById("swellH");
  swellH.innerText = swellHeight;

  const swellPer = `${myData.hours[displayHour].swellPeriod.sg} seconds`;
  const swellP = document.getElementById("swellP");
  swellP.innerText = swellPer;
};
// toDegrees(170); // temporary only for wind direction and swell direction

const caculateScore = (myData) => {
  let swellHeight = myData.hours[displayHour].swellHeight.sg;
  // console.log(`Swell Height: ${swellHeight}`);
  // let swellHeight = 4.4; // temporary
  if (swellHeight < 1) {
    swellHscore = 20;
  } else if (swellHeight > 1.3 && swellHeight < 2.2) {
    swellHscore = 70;
  } else if (swellHeight >= 2.2 && swellHeight < 4) {
    swellHscore = 100;
  } else {
    swellHscore = 20;
  }

  let windSpeedCount = myData.hours[displayHour].windSpeed.sg;
  // console.log(`windSpeed ${windSpeedCount}`);
  // let windSpeedCount = 17; // temporary for wind speed count testing
  if (windSpeedCount > 0 && windSpeedCount <= 10) {
    windSpeedScore = 10;
  } else if (windSpeedCount >= 10 && windSpeedCount < 18) {
    windSpeedScore = 90;
  } else if (windSpeedCount >= 18 && windSpeedCount < 30) {
    windSpeedScore = 100;
  } else {
    windSpeedScore = 20;
  }

  let swellPrd = myData.hours[displayHour].swellPeriod.sg;
  // console.log(`swellPrd ${swellPrd}`);
  // let swellPrd = 6; // temporary only for testing
  if (swellPrd > 0 && swellPrd <= 4) {
    swellPeriodScore = 50;
  } else if (swellPrd > 4 && swellPrd <= 12) {
    swellPeriodScore = 100;
  } else {
    swellPeriodScore = 70;
  }

  // contribution to overall score as a percentage
  const windDircont = 0.3,
    windScont = 0.3,
    swellDircont = 0.1,
    swellHcont = 0.2,
    swellPcont = 0.1;

  // Thermometer score
  let thermscore =
    swellHscore * swellHcont +
    windSpeedScore * windScont +
    windDirScore * windDircont +
    swellDirScore * swellDircont +
    swellPeriodScore * swellPcont;

  // console.log("Wind Direction Score: " + windDirScore);
  // console.log("Wind Speed Score: " + windSpeedScore);
  // console.log("Swell Direction Score: " + swellDirScore);
  // console.log("Swell Height Score: " + swellHscore);
  // console.log("Swell Period Score: " + swellPeriodScore);

  // let thermscore = 80; // temporary for testing only
  if (thermscore < 20) {
    inner.style.backgroundColor = "#df362d";
  } else if (thermscore >= 20 && thermscore < 80) {
    inner.style.backgroundColor = "#ff8300";
  } else {
    inner.style.backgroundColor = "rgb(4, 215, 46)";
  }
  inner.style.width = `${thermscore}%`;
  myData.hours[displayHour];
  return [thermscore, myData.hours[displayHour].time];
};
