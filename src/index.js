//VARIABLES
const createGridButton = document.querySelector(".create-grid-button");
const resetGameButton = document.querySelector(".reset-game-button");
let dimensionX;
let dimensionY;
let gridMatrix = [];
let newGridMatrix = [];
let count = 0;
let neighboursArray = [];

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

//FUNCION PARA CAMBIAR EL COLOR DE LAS CELULAS
function cellChangeColor() {
  let location = this.id.split("_");
  let rowIndex = parseInt(location[0]);
  let columnIndex = parseInt(location[1]);
  if (this.className === "alive") {
    this.setAttribute("class", "dead");
    gridMatrix[rowIndex][columnIndex] = 0;
  } else {
    this.setAttribute("class", "alive");
    gridMatrix[rowIndex][columnIndex] = 1;
  }
}

//FUNCION PARA CREAR MATRIZ DEL PRINCIPIO DEL JUEGO
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

//FUNCION PARA CELULAS VECINAS
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
  createNewGridMatrix(dimensionX, dimensionY);
  dearOrAlive(dimensionX, dimensionY);
}

//FUNCION PARA SIGUIENTE MATRIZ
function createNewGridMatrix(dimensionX, dimensionY) {
  for (let i = 0; i < dimensionX; i++) {
    newGridMatrix[i] = [];
    for (let j = 0; j < dimensionY; j++) {
      newGridMatrix[i][j] = [];
      newGridMatrix[i][j] = 0;
    }
  }
  return gridMatrix;
}

//FUNCION PARA VER COMO QUEDA LA NUEVA MATRIZ
function dearOrAlive(dimensionX, dimensionY) {
  let counter = 0;
  for (let i = 0; i < dimensionX; i++) {
    for (let j = 0; j < dimensionY; j++) {
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] === 0) {
        newGridMatrix[i][j] = 0;
      }
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] === 3) {
        newGridMatrix[i][j] = 1;
      }
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] === 2) {
        newGridMatrix[i][j] = 1;
      }
      if (gridMatrix[i][j] === 1 && neighboursArray[counter] > 3) {
        newGridMatrix[i][j] = 0;
      }
      if (gridMatrix[i][j] === 0 && neighboursArray[counter] === 3) {
        newGridMatrix[i][j] = 1;
      }
      counter++;
    }
  }
  console.log(newGridMatrix);
}

const resetGame = () => {
  location.reload();
};
