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
      nextRow >= verticalcells ||
      nextColumn < 0 ||
      nextColumn >= horizontalCells
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
    console.log(nextColumn);

    moveThroughCellAndChick(nextRow, nextColumn);
  }
  //visit that next cell
};
