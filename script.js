const player = document.getElementById("player");
const world = document.getElementById("world");
const buildings = document.querySelectorAll(".building");

let keys = {};
let playerX = 200;
let playerY = 300;
let speed = 4;

let cameraX = 0;
let worldWidth = 4000;
let viewWidth = window.innerWidth;

document.addEventListener("keydown", e => { keys[e.key.toLowerCase()] = true; });
document.addEventListener("keyup", e => { keys[e.key.toLowerCase()] = false; });

function playSound(id) {
  const audio = document.getElementById(id);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// Movement loop
function gameLoop() {
  let moved = false;
  
  if (keys["a"] && playerX > 0) {
    playerX -= speed;
    moved = true;
  }
  if (keys["d"] && playerX < worldWidth - 64) {
    playerX += speed;
    moved = true;
  }
  if (keys["w"]) {
    playerY -= 2;
    moved = true;
  }
  if (keys["s"]) {
    playerY += 2;
    moved = true;
  }

  // Play footsteps
  if (moved) playSound("sfx-footstep");

  // Clamp Y
  if (playerY < 200) playerY = 200;
  if (playerY > 350) playerY = 350;

  // Move player sprite
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  // Camera follows player
  cameraX = Math.min(Math.max(playerX - viewWidth/2, 0), worldWidth - viewWidth);
  world.style.left = -cameraX + "px";

  requestAnimationFrame(gameLoop);
}
gameLoop();

// Day/Night cycle
const overlay = document.createElement("div");
overlay.id = "day-night-overlay";
document.getElementById("game").appendChild(overlay);

let cycleTime = 0; // increments with frames
function dayNightLoop() {
  cycleTime++;
  let cycle = (cycleTime % 2000) / 2000; // full cycle
  let night = Math.sin(cycle * Math.PI * 2); // oscillates -1..1
  overlay.style.opacity = (night > 0 ? night : 0) * 0.6;
  requestAnimationFrame(dayNightLoop);
}
dayNightLoop();

// Building interaction
buildings.forEach(b => {
  b.addEventListener("click", () => {
    if (b.classList.contains("compound")) {
      const id = b.getAttribute("data-id");
      window.location.href = `compound.html?c=${id}`;
    } else if (b.id === "shop") {
      window.location.href = "shop.html";
    } else if (b.id === "home") {
      window.location.href = "home.html";
    }
  });
});
