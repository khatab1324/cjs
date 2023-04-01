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
ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
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
