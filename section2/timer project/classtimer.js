class Timer {
  constructor(dutrationInput, startButton, pauseButton, callbacks) {
    this.dutrationInput = dutrationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      // i but it in if statment because callback is optional if callbacks is exist enter inside the condition
      this.onStart = callbacks.onStart; //because onStart is object
      this.onTick = callbacks.onTick;
      this.onAlmostComplete = callbacks.onAlmostComplete;
      this.onComplete = callbacks.onComplete;
    }
    startButton.addEventListener("click", this.start);
    pauseButton.addEventListener("click", this.pause);
  }
  start = () => {
    this.tick();
    this.tinterval = setInterval(this.tick, 10);
    if (this.onStart) {
      //you check if there onStart because rememeber it is optional ,if there is no callbacks and you don't provide check it will give you error becuase it not deffine
      this.onStart(this.timeRemaining);
    }
    // clearInterval(timer);
  };

  pause = () => {
    clearInterval(this.tinterval);
    console.log("you are paused");
  };

  tick = () => {
    let timeRemaining = this.timeRemaining;
    if (timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = timeRemaining - 0.01; // becuse set timeRemaining(time) , and remember timeRemaining is a function watch epsoede 207
    }
    if (this.onTick) {
      this.onTick(this.timeRemaining);
    }
    if (timeRemaining === 10) {
      if (this.onAlmostComplete) {
        this.onAlmostComplete(this.timeRemaining);
      }
    }
  };
  // get is key use inside class and you can deal with function like variable without ()
  // and the propose for use it to make the syntax easy and trick the other engeneers
  get timeRemaining() {
    return parseFloat(this.dutrationInput.value);
  }
  set timeRemaining(time) {
    this.dutrationInput.value = time.toFixed(2);
  }
}
