// Shared state stored in localStorage
if (!localStorage.getItem("coins")) localStorage.setItem("coins", 0);
if (!localStorage.getItem("weapons")) localStorage.setItem("weapons", JSON.stringify([]));
if (!localStorage.getItem("lives")) localStorage.setItem("lives", 3);
if (!localStorage.getItem("day")) localStorage.setItem("day", "true");

// Load questions
let QUESTIONS = [];
fetch("questions.js")
  .then(r => r.text())
  .then(t => eval(t)); // loads QUESTIONS array

function getCoins() { return parseInt(localStorage.getItem("coins")); }
function setCoins(c) { localStorage.setItem("coins", c); }

function getWeapons() { return JSON.parse(localStorage.getItem("weapons")); }
function addWeapon(w) {
  let arr = getWeapons();
  if (!arr.includes(w)) arr.push(w);
  localStorage.setItem("weapons", JSON.stringify(arr));
}

function toggleDayNight() {
  let isDay = localStorage.getItem("day") === "true";
  localStorage.setItem("day", (!isDay).toString());
  if (!isDay) {
    // became day
    alert("☀️ A new day begins!");
  } else {
    // became night
    window.location.href = "night.html";
  }
}

function enterCompound(index) {
  window.location.href = `compound.html?c=${index}`;
}

window.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  if (status) {
    status.innerHTML =
      `Coins: ${getCoins()} | Weapons: ${getWeapons().join(", ") || "none"} | Lives: ${localStorage.getItem("lives")} | ${localStorage.getItem("day") === "true" ? "Day" : "Night"}`;
  }
});
