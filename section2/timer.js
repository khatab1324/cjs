const dutrationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.getElementById("pause");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * Math.PI * 2;
circle.setAttribute("stroke-dasharray", perimeter);

let currentofset = 0;
const timer = new Timer(dutrationInput, startButton, pauseButton, {
  onStart() {
    console.log("run the timer is started");
  },
  onTick() {
    console.log("the timer is running");
    circle.setAttribute("stroke-dashoffset", currentofset);
    currentofset = currentofset - 2;
  },
  onAlmostComplete() {
    console.log("there is 10s remaining");
  },
  onComplete() {
    console.log("we finely finesh");
  },
});
