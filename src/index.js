const startGameButton = document.querySelector(".create-grid-button");

startGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  createGrid();
});

function createGrid() {
  const dimensionX = document.getElementById("rows-number").value;
  const dimensionY = document.getElementById("columns-number").value;
  document.querySelector(".game-setup-container").style.display = "none";
  document.querySelector(".game-container").style.display = "block";
  const gridContainer = document.querySelector(".grid-container");
  const table = document.createElement("table");

  for (let i = 0; i < dimensionX; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < dimensionY; j++) {
      const cell = document.createElement("td");
      cell.setAttribute("class", "dead");
      cell.onclick = cellChangeColor;
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  gridContainer.appendChild(table);
}

function cellChangeColor() {
  this.setAttribute("class", "alive");
}
