navigator.getBattery().then(function (battery) {
  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
    updateChargingInfo();
    updateDischargingInfo();
  }
  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", function () {
    updateChargeInfo();
  });
  function updateChargeInfo() {
    let ps = document.getElementById("power-src");
    ps.innerText = battery.charging ? "Yes" : "No";
    console.log("Battery charging? " + (battery.charging ? "Yes" : "No"));
  }

  battery.addEventListener("levelchange", function () {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    let lp = document.getElementById("level-percent");
    lp.innerText = battery.level * 100 + "%";
    console.log("Battery level: " + battery.level * 100 + "%");
  }

  battery.addEventListener("chargingtimechange", function () {
    updateChargingInfo();
  });
  function updateChargingInfo() {
    let ct = document.getElementById("charged-in");
    ct.innerText = battery.chargingTime + " seconds";
    console.log("Battery charging time: " + battery.chargingTime + " seconds");
  }

  battery.addEventListener("dischargingtimechange", function () {
    updateDischargingInfo();
  });
  function updateDischargingInfo() {
    let dt = document.getElementById("remain-time");
    dt.innerText = battery.dischargingTime + " seconds";
    console.log(
      "Battery discharging time: " + battery.dischargingTime + " seconds"
    );
  }
});

const mainHeading = document.getElementById("bat-title");
mainHeading.style.color = "#333";

//Battery Level

const rangeSlideVal = document.getElementById("slideRange");
let batLevel = document.getElementById("bat-level");

rangeSlideVal.addEventListener(
  "change",
  function () {
    let batteryLevel = rangeSlideVal.value;
    batLevel.style.width = batteryLevel + "%";
    let pc = document.getElementById("bat-percent");
    pc.innerText = batteryLevel + "%";
    pc.style.color = "green";

    // change battery indicator colour and text based on level
    if (batteryLevel < 40) {
      batLevel.style.backgroundColor = "red";
      pc.style.color = "red";
    } else if (batteryLevel > 40 && batteryLevel < 70) {
      batLevel.style.backgroundColor = "orange";
      pc.style.color = "orange";
    } else {
      batLevel.style.backgroundColor = "green";
      pc.style.color = "green";
    }
  },
  false
);
