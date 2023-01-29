//VARIABLES
const createGridButton = document.querySelector(".create-grid-button");
let dimensionX;
let dimensionY;
let gridMatrix = [];

//EVENTOS
createGridButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid();
});

//FUNCION PARA CREAR EL TABLERO
function createGrid() {
  dimensionX = document.getElementById("rows-number").value;
  dimensionY = document.getElementById("columns-number").value;
  document.querySelector(".game-setup-container").style.display = "none";
  document.querySelector(".game-container").style.display = "block";
  const gridContainer = document.querySelector(".grid-container");
  const table = document.createElement("table");

  for (let i = 0; i < dimensionX; i++) {
    const rows = document.createElement("tr");
    for (let j = 0; j < dimensionY; j++) {
      const cell = document.createElement("td");
      cell.setAttribute("class", "dead");
      cell.setAttribute("id", i + "_" + j);
      cell.onclick = cellChangeColor;
      rows.appendChild(cell);
    }
    table.appendChild(rows);
  }
  gridContainer.appendChild(table);
}

function cellChangeColor() {
  let location = this.id.split("_");
  let rowNumber = parseInt(location[0]);
  let columnNumber = parseInt(location[1]);
  if (this.className === "alive") {
    this.setAttribute("class", "dead");
  } else {
    this.setAttribute("class", "alive");
  }
}

//FUNCION PARA CREAR MATRICES
function createGridMatrix(dimensionX, dimensionY) {
  for (let i = 0; i < dimensionX; i++) {
    gridMatrix[i] = [];
    for (let j = 0; j < dimensionY; j++) {
      gridMatrix[i][j] = [];
      gridMatrix[i][j] = 0;
    }
  }
  return gridMatrix;
}
