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

// ============================creat projectile==================
class Projectile {
  constructor(x, y, raduis, color, vilocity) {
    //vilocity becuase we know the obj is moving
    this.x = x;
    this.y = y;
    this.raduis = raduis;
    this.color = color;
    this.vilocity = vilocity;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.raduis, 0, Math.PI * 2); //for draw circal
    ctx.fillStyle = this.color;
    ctx.fill(); //fill the circal
  }
  update() {
    this.draw(); //now we update the draw inside this proprity
    this.x = this.x + this.vilocity.x;
    this.y = this.y + this.vilocity.y;
  }
}
//================================animation ==================================
function animate() {
  requestAnimationFrame(animate); //now it loop over and over ...
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  firstPlayer.draw(); //to draw the player after clear all canves
  projectiles.forEach((projectile) => {
    projectile.update();
  });
}

const firstPlayer = new Player(canvas.width / 2, canvas.height / 2, 50, "red");

const projectiles = [];
addEventListener("click", (event) => {
  // =============calculate the angle that where the projectile should go ,and that depend where you press
  const angle = Math.atan2(
    event.clientY - canvas.height / 2,
    event.clientX - canvas.width / 2
  );
  console.log(angle);
  projectiles.push(
    new Projectile(canvas.width / 2, canvas.height / 2, 15, "blue", {
      //this vilacity
      x: Math.cos(angle),
      y: Math.sin(angle),
    })
  );
});
animate();
