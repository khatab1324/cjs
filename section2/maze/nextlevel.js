function increaseCells() {
  let addCellsX = horizontalCells + 2;
  let addCellsY = verticalcells + 2;
  storage("cellsx", addCellsX);
  storage("cellsy", addCellsY);
}

nextlevel.addEventListener("click", (event) => {
  location.reload();
});
const storage = (key, value) => {
  if (key === "cellsx") {
    window.localStorage.setItem("cellsx", value);
  }
  if (key === "cellsy") {
    window.localStorage.setItem("cellsy", value);
  }
};
