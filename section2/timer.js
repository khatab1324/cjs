const dutrationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.getElementById("pause");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * Math.PI * 2;

circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(dutrationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    duration = totalDuration;
    console.log("run the timer is started");
  },
  onTick(timeRemaining) {
    console.log("the timer is running");
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onAlmostComplete(timeRemaining) {
    console.log("there is 10s remaining");
    circle.setAttribute("stroke", "red");
  },
  onComplete() {
    console.log("we finely finesh");
  },
});
