const { World, Engine, Render, Runner, Bodies } = Matter;

const engine = Engine.create(); //if you call engine you find world
const { world } = engine; //its same Matter.Engine.create().world

//i make the width and hight here to use them latter
const columeVertical = 3;
const cellsVertical = 2;
const cells = 3;
const columeHorizontal = 2;
const cellsHorizontal = 3;
const width = 600;
const hight = 600;
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
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, hight, width, 40, { isStatic: true }),
  Bodies.rectangle(0, hight / 2, 40, hight, { isStatic: true }),
  Bodies.rectangle(width, hight / 2, 40, hight, { isStatic: true }),
];

World.add(world, walls); //you add walls to world

//random shapes
World.add(
  world,
  Bodies.rectangle(Math.random() * width, Math.random() * hight, 50, 50)
);

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
const verticals = Array(columeVertical)
  .fill(false)
  .map((c) => Array(cellsVertical).fill(false));

const horizontals = Array(columeHorizontal)
  .fill(false)
  .map((c) => Array(cellsHorizontal).fill(false));

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
    [row - 1, column],
    [row + 1, column],
    [row, column - 1],
    [row, column + 1],
  ]);
  console.log(neighbors);
  //for each neighbor ....
  for (let neighbor of neighbors) {
    //here I will make destractur
    //see if the nighbor is out of the bounds
    //if we visited that nighbor continue to the next nighbor
    //remove the wall from  either horizontals or verticals
  }
  //visit that next cel
};
moveThroughCellAndChick(1, 1);
