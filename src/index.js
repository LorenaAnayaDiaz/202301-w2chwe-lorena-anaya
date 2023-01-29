//VARIABLES
const createGridButton = document.querySelector(".create-grid-button");
const resetGameButton = document.querySelector(".reset-game-button");
let dimensionX;
let dimensionY;
let gridMatrix = [];
let count = 0;
let neighboursArray = [];
let cell;
let timer;

//EVENTOS
createGridButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid();
  createGridMatrix(dimensionX, dimensionY);
});

resetGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  resetGame();
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
      cell = document.createElement("td");
      cell.setAttribute("class", "dead");
      cell.setAttribute("id", i + "_" + j);
      cell.onclick = cellChangeColor;
      rows.appendChild(cell);
    }
    table.appendChild(rows);
  }
  gridContainer.appendChild(table);
}

//FUNCION PARA CAMBIAR EL COLOR DE LAS CELULAS
function cellChangeColor() {
  let position = this.id.split("_");
  let rowIndex = parseInt(position[0]);
  let columnIndex = parseInt(position[1]);
  if (this.className === "alive") {
    this.setAttribute("class", "dead");
    gridMatrix[rowIndex][columnIndex] = 0;
  } else {
    this.setAttribute("class", "alive");
    gridMatrix[rowIndex][columnIndex] = 1;
  }
}
//FUNCION PARA CREAR MATRIZ
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

//FUNCION PARA CONTAR CELULAS VECINAS
function countNeighbours() {
  for (let i = 0; i < dimensionX; i++) {
    for (let j = 0; j < dimensionY; j++) {
      if (gridMatrix[i - 1] !== undefined && gridMatrix[i - 1][j - 1] === 1) {
        count++;
      }
      if (gridMatrix[i - 1] !== undefined && gridMatrix[i - 1][j] === 1) {
        count++;
      }
      if (
        gridMatrix[i - 1] !== undefined &&
        gridMatrix[i - 1][1 + j] !== undefined &&
        gridMatrix[i - 1][1 + j] === 1
      ) {
        count++;
      }
      if (gridMatrix[i][j - 1] === 1) {
        count++;
      }
      if (gridMatrix[i + 1] !== undefined && gridMatrix[i + 1][j] === 1) {
        count++;
      }
      if (gridMatrix[i + 1] !== undefined && gridMatrix[i + 1][j + 1] === 1) {
        count++;
      }
      if (gridMatrix[i][j + 1] === 1) {
        count++;
      }
      if (gridMatrix[i + 1] !== undefined && gridMatrix[i + 1][j - 1] === 1) {
        count++;
      }
      neighboursArray.push(count);
      console.log(neighboursArray);
      count = 0;
    }
  }

  dearOrAlive(dimensionX, dimensionY);
}

//FUNCION PARA VER COMO QUEDA LA NUEVA MATRIZ
function dearOrAlive(dimensionX, dimensionY) {
  let counter = 0;
  for (let i = 0; i < dimensionX; i++) {
    for (let j = 0; j < dimensionY; j++) {
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] === 0) {
        gridMatrix[i][j] = 0;
      }
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] === 3) {
        gridMatrix[i][j] = 1;
      }
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] === 2) {
        gridMatrix[i][j] = 1;
      }
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] > 3) {
        gridMatrix[i][j] = 0;
      }
      if (gridMatrix[i][j] === 0 && neighboursArray[counter] === 3) {
        gridMatrix[i][j] = 1;
      }
      counter++;
    }
  }
  console.log(gridMatrix);
  paintNewGrid();
}

//FUNCION PARA QUE SE RECARGUE EL JUEGO
const resetGame = () => {
  location.reload();
};

//FUNCION PARA PINTAR DE NUEVO EL GRID
function paintNewGrid() {
  let cell = "";
  for (let i = 0; i < dimensionX; i++) {
    for (let j = 0; j < dimensionY; j++) {
      cell = document.getElementById(i + "_" + j);
      if (gridMatrix[i][j] == 0) {
        cell.setAttribute("class", "dead");
      } else {
        cell.setAttribute("class", "alive");
      }
    }
  }
}
