const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
const engine = Engine.create(); //if you call engine you find world
const { world } = engine; //its same Matter.Engine.create().world

const getItemFromLocalStorage = () => {
  let cellsx = window.localStorage.getItem("cellsx");
  let cellsy = window.localStorage.getItem("cellsy");
  if (!cellsx) cellsx = 4;
  if (!cellsy) cellsy = 3;
  return [parseInt(cellsx), parseInt(cellsy)];
};

//i make the width and height here to use them latter
const nextlevel = document.querySelector("#next");
const [cellsx, cellsy] = getItemFromLocalStorage();

const horizontalCells = cellsx ?? 5;
const verticalcells = cellsy ?? 5;
console.log(cellsx);
console.log(cellsy);

const width = window.innerWidth;
const height = window.innerHeight;
const unitLengthX = width / horizontalCells;
const unitLengthY = height / verticalcells;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false, //it give the colors for the shapes
    width,
    height,
  },
}); //if you call it you will find element:null but we need it in our HTML also engine: undefined,
Render.run(render);
Runner.run(Runner.create(), engine);

//walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
];

World.add(world, walls); //you add walls to world

// maze genration

const grid = Array(horizontalCells) //watch 299
  .fill("anythingbecuasewillreplace")
  .map((c) => Array(verticalcells).fill(false)); //Array => make arrray have 3 emdey element and you use fill to put what the value you want
// you can't do this const grid = Array(3).fill([false,false,false]) whatch 277 6:00
const verticals = Array(horizontalCells - 1)
  .fill(false)
  .map((c) => Array(verticalcells).fill(false));

const horizontals = Array(verticalcells - 1)
  .fill(false)
  .map((c) => Array(horizontalCells).fill(false));

const startRow = Math.floor(Math.random() * verticalcells);
const startColumn = Math.floor(Math.random() * horizontalCells);
console.log(startRow);
console.log(startColumn);

moveThroughCellAndChick(startRow, startColumn);

// drow the maze
horizontals.forEach((row, rowIndex) => {
  console.log(rowIndex);
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    } else {
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX / 2, //because the length start from center
        rowIndex * unitLengthY + unitLengthY,
        unitLengthX,
        5,
        {
          isStatic: true,
          label: "wall",
          render: { fillStyle: "red" },
        }
      );
      World.add(world, wall);
    }
  });
});
verticals.forEach((row, rowIndex) => {
  console.log(rowIndex);
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    } else {
      const wall = Bodies.rectangle(
        columnIndex * unitLengthX + unitLengthX,
        rowIndex * unitLengthY + unitLengthY / 2,

        5,
        unitLengthY,
        {
          isStatic: true,
          label: "wall",
          render: {
            fillStyle: "red",
          },
        }
      );
      World.add(world, wall);
    }
  });
});

//goal
const goal = Bodies.rectangle(
  width - unitLengthX / 2,
  height - unitLengthY / 2,
  unitLengthX * 0.8,
  unitLengthY * 0.8,
  {
    label: "goal",
    isStatic: true,

    render: {
      fillStyle: "rgb(54, 243, 11)",
      sprite: {
        texture:
          "https://media.istockphoto.com/id/931155784/photo/large-wooden-door-open-in-castle-wall.jpg?s=1024x1024&w=is&k=20&c=XYshycuCWOYKYTFleTF07cM-ICWl9VbBbngmEZagGtc=",
        xScale: unitLengthX * 0.0009,
        yScale: unitLengthY * 0.0012,
      },
    },
    options: {
      wireframes: false,
    },
  }
);
World.add(world, goal);

//ball

const ballRadius = Math.min(unitLengthX, unitLengthY) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: "ball",
});
ball.restitution = 0;
World.add(world, ball);

const sprint = Bodies.rectangle(
  Math.random() * width,
  Math.random() * height,
  (width / horizontalCells) * 0.8,
  (height / verticalcells) * 0.8,
  {
    label: "sprint",
    options: {
      wireframes: false,
    },
    render: {
      sprite: {
        texture:
          "http://aqwwiki.wdfiles.com/local--files/use-items/ClassBoost.png",
        xScale: unitLengthX * 0.0025,
        yScale: unitLengthY * 0.0025,
      },
      fillStyle: "red",
    },
  }
);

World.add(world, sprint);

//move the player
let { x, y } = ball.velocity;
document.addEventListener("keydown", (e) => {
  moveing(e, 2);
});
world.gravity.y = 0;

// win condition

Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    console.log(collision);
    const labelwin = ["ball", "goal"];
    if (
      labelwin.includes(collision.bodyA.label) &&
      labelwin.includes(collision.bodyB.label)
    ) {
      increaseCells();
      document.querySelector(".winner").classList.remove("hidden");
      world.gravity.y = 1;
      world.bodies.forEach((body) => {
        if (body.label === "wall") {
          Body.setStatic(body, false);
        }
      });
    }

    //

    //

    const lebelboost = ["ball", "sprint"];
    if (
      lebelboost.includes(collision.bodyA.label) &&
      lebelboost.includes(collision.bodyB.label)
    ) {
      World.remove(world, sprint);
      console.log("you fast");
      if (horizontalCells > 10) {
        document.addEventListener("keydown", (e) => {
          moveing(e, 3);
        });
      }
      if (horizontalCells <= 10) {
        document.addEventListener("keydown", (e) => {
          moveing(e, 5);
        });
      }
    }
  });
});
const moveing = (e, i) => {
  if (e.key === "ArrowDown" || e.key === "s") {
    console.log("down");
    Body.setVelocity(ball, { x, y: y + i });
  } else if (e.key === "ArrowUp" || e.key === "w") {
    console.log("Up");
    Body.setVelocity(ball, { x, y: y - i });
  } else if (e.key === "ArrowRight" || e.key === "d") {
    console.log("Right");
    Body.setVelocity(ball, { x: x + i, y: y });
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    console.log("left");
    Body.setVelocity(ball, { x: x - i, y: y });
  }
};
function increaseCells() {
  let addCellsX = window.localStorage.setItem("cellsx", cellsx + 3);
  let addCellsY = window.localStorage.setItem("cellsy", cellsy + 3);
}

nextlevel.addEventListener("click", (event) => {
  // getItemFromLocalStorage();
  // const [cellsx, cellsy] = getItemFromLocalStorage();
  location.reload();
});
