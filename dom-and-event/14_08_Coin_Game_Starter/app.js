function isTouching(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.top + aRect.height < bRect.top ||
    aRect.top > bRect.top + bRect.height ||
    aRect.left + aRect.width < bRect.left ||
    aRect.left > bRect.left + bRect.width
  );
}
// -----------------------------------------------my code -------------------------------------
const player = document.querySelector("#player");
const coin = document.querySelector("#coin");
const score = document.querySelector("h1");
const count = 0;
window.addEventListener("keyup", function (e) {
  let currTop = extractPosition(player.style.top);
  if (e.key === "ArrowDown" || e.key === "s") {
    currTop = extractPosition(player.style.top);
    player.style.top = `${currTop + 50}px`;
  } else if (e.key === "ArrowUp" || e.key === "w") {
    currTop = extractPosition(player.style.top);
    player.style.top = `${currTop - 50}px`;
  } else if (e.key === "ArrowRight" || e.key === "d") {
    currRight = extractPosition(player.style.left);
    player.style.transform = "scale(1,1)";
    player.style.left = `${currRight + 50}px`;
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    currLeft = extractPosition(player.style.left);
    player.style.left = `${currLeft - 50}px`;
    player.style.transform = "scale(-1,1)";
  }
  if (isTouching(player, coin)) moveCoin();
});

const extractPosition = (position) => {
  if (!position) {
    player.style.top = "100px";
    player.style.left = "10px";
  }
  return parseInt(position);
};

const moveCoin = () => {
  let movingx = Math.floor(Math.random() * window.innerWidth);
  let movingy = Math.floor(Math.random() * window.innerHeight);
  if (movingx > 1200) {
    movingx = 900;
  }
  if (movingy > 1000) {
    movingy = 1900;
  }

  coin.style.top = `${movingx}px`;
  coin.style.left = `${movingy}px`;
};
moveCoin();
