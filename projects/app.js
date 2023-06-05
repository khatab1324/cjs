const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //ctx=context //and context it huge api that you can draw through it
canvas.width = innerWidth; //it same window.innerWidth but if you write innerWidth the browser will understand
canvas.height = innerHeight;

// ============================creat player===================
class Player {
  constructor(x, y, raduis, color) {
    //now when we pass new player we can give it new color new raduis new...
    // proprity position and shap and color
    this.x = x;
    this.y = y;
    this.raduis = raduis;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2); //for draw circal
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
const firstPlayer = new Player(innerWidth / 2, innerHeight / 2, 50, "red");

firstPlayer.draw();
