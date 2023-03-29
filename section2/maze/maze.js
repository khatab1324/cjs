const { World, Engine, Render, Runner, Bodies } = Matter;

const engine = Engine.create(); //if you call engine you find world
const { world } = engine; //its same Matter.Engine.create().world

//i make the width and hight here to use them latter

const cells = 10;
const width = 600;
const hight = 600;
const unitLength = width / cells;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true, //it give the colors for the shapes
    width,
    hight,
  },
}); //if you call it you will find element:null but we need it in our HTML also engine: undefined,
Render.run(render);
Runner.run(Runner.create(), engine);

//walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, hight, width, 2, { isStatic: true }),
  Bodies.rectangle(0, hight / 2, 2, hight, { isStatic: true }),
  Bodies.rectangle(width, hight / 2, 2, hight, { isStatic: true }),
];

World.add(world, walls); //you add walls to world

// maze genration

// this will shuffle all the cells neighbor and start with random order like left,up,down,right or up left rihgt down its random
const shuffleArray = (arr) => {
  let counter = arr.length;
  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    counter--;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

const grid = Array(cells)
  .fill("anythingbecuasewillreplace")
  .map((c) => Array(cells).fill(false)); //Array => make arrray have 3 emdey element and you use fill to put what the value you want
// you can't do this const grid = Array(3).fill([false,false,false]) whatch 277 6:00
const verticals = Array(cells)
  .fill(false)
  .map((c) => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(false)
  .map((c) => Array(cells).fill(false));

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

const moveThroughCellAndChick = (row, column) => {
  // if i have visited the cell at [row,column] return
  if (grid[row][column]) {
    return;
  }
  //Mark this cell as being visited
  grid[row][column] = true;
  //Assemble randomly-ordered list of neighbors
  const neighbors = shuffleArray([
    [row - 1, column, "up"],
    [row + 1, column, "down"],
    [row, column - 1, "left"],
    [row, column + 1, "right"],
  ]);
  console.log(neighbors);
  //for each neighbor ....
  for (let neighbor of neighbors) {
    //here I will make destractur
    const [nextRow, nextColumn, direction] = neighbor;
    //see if the nighbor is out of the bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue; //continue is tell you donot leave the loop but in other hand donot run the rest code just move for the next array
    }
    //if we visited that nighbor continue to the next nighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    //remove the wall from  either horizontals or verticals
    if (direction === "left") {
      verticals[row][column - 1] = true;
    }
    if (direction === "right") {
      verticals[row][column] = true;
    }
    if (direction === "up") {
      horizontals[row - 1][column] = true;
    }
    if (direction === "down") {
      horizontals[row][column] = true;
    }
    moveThroughCellAndChick(nextRow, nextColumn);
  }
  //visit that next cell
};
moveThroughCellAndChick(startRow, startColumn);

// drow the maze
horizontals.forEach((row, rowIndex) => {
  console.log(rowIndex);
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    } else {
      const wall = Bodies.rectangle(
        columnIndex * unitLength + unitLength / 2, //because the length start from center
        rowIndex * unitLength + unitLength,
        unitLength,
        2,
        { isStatic: true }
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
        columnIndex * unitLength + unitLength,
        rowIndex * unitLength + unitLength / 2,

        2,
        unitLength,
        { isStatic: true }
      );
      World.add(world, wall);
    }
  });
});

//goal
const goal = Bodies.rectangle(
  width - unitLength / 2,
  hight - unitLength / 2,
  unitLength * 0.8,
  unitLength * 0.8,
  { isStatic: true }
);
World.add(world, goal);

//ball
const ball = Bodies.rectangle(
  Math.random() * width,
  Math.random() * hight,
  (width / cells) * 0.8,
  (width / cells) * 0.8,
  {
    options: {
      wireframes: false,
    },
    render: {
      fillStyle: "green",
    },
  }
);

World.add(world, ball);
