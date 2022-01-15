let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const PLAYER_1 = "fa-circle"; // odd rounds
const PLAYER_2 = "fa-times"; // even rounds
let round = 0;
document.getElementById("round").innerHTML = round.toString();
document.getElementById("move").className = `fa ${PLAYER_2}`;
const boxes = [...document.querySelectorAll(".box")];
boxes.forEach((box) => box.addEventListener("click", pickBox));
document.getElementById("reset").addEventListener("click", reset);

function pickBox(event) {
  const { row, column } = event.target.dataset;
  const turn = round % 2 === 0 ? PLAYER_2 : PLAYER_1;
  if (board[row][column] !== "") return;
  event.target.classList.add(turn);
  board[row][column] = turn;
  round++;
  document.getElementById("round").innerHTML = round.toString();
  document.getElementById("move").className = `fa ${turn}`;
  let result = checkWinner();
  if (result) {
    boxes.forEach((box) => box.removeEventListener("click", pickBox));
  }
}

function checkWinner() {
  let winner = null;
  // whole board with selected field is reduced to one array with classnames as its values
  const resultBoard = board.reduce((previousValue, currentValue) =>
    previousValue.concat(currentValue)
  );
  let moves = {
    "fa-circle": [],
    "fa-times": [],
  };
  // pushes index of position player has selected
  resultBoard.forEach((item, index) =>
    moves[item] ? moves[item].push(index) : null
  );
  combinations.forEach((combination) => {
    // if player has selected positions with indexes that creates winning combination then he wins
    if (combination.every((index) => moves[PLAYER_1].indexOf(index) > -1)) {
      winner = `Winner: PLAYER_1!`;
    }
    if (combination.every((index) => moves[PLAYER_2].indexOf(index) > -1)) {
      winner = `Winner: PLAYER_2!`;
    }
  });
  return winner;
}

/*
  Resets Tic-Tac-Toe, 
*/
function reset() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  round = 0;
  document.getElementById("round").innerHTML = round.toString();
  document.getElementById("move").className = `fa ${PLAYER_2}`;
  const boxes = [...document.querySelectorAll(".box")];
  boxes.forEach((box) => {
    box.removeEventListener("click", pickBox);
    box.addEventListener("click", pickBox);
    box.classList.remove(...box.classList);
    box.classList.add("box");
    box.classList.add("fa");
  });
}
