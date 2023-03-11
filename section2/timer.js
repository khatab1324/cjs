const dutrationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.getElementById("pause");

class Timer {
  constructor(dutrationInput, startButton, pauseButton) {
    this.dutrationInput = dutrationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    startButton.addEventListener("click", this.start);
    pauseButton.addEventListener("click", this.pause);
  }
  start = () => {
    this.tick();
    this.tinterval = setInterval(this.tick, 1000);
    // clearInterval(timer);
  };

  pause = () => {
    clearInterval(this.tinterval);
    console.log("you are paused");
  };

  tick = () => {
    console.log("here i am");
  };
}
const timer = new Timer(dutrationInput, startButton, pauseButton);
