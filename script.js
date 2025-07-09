let currentPlayer = 'X';
let cells = Array(9).fill('');
let scores = { X: 0, O: 0 };
let gameActive = true;

function updateStatus() {
  document.getElementById('turn').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(pattern => pattern.every(i => cells[i] === player));
}

function endGame(message) {
  document.getElementById('turn').textContent = message;
  scores[currentPlayer]++;
  document.getElementById('x-score').textContent = scores.X;
  document.getElementById('o-score').textContent = scores.O;
  gameActive = false;
}

function handleClick(e) {
  const i = e.target.dataset.index;
  if (!gameActive || cells[i]) return;

  cells[i] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
  } else if (!cells.includes('')) {
    document.getElementById('turn').textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }
}

function resetBoard() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  updateStatus();
  const board = document.getElementById('board');
  board.innerHTML = '';
  cells.forEach((_, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  });
}

document.getElementById('clear-score').addEventListener('click', () => {
  scores = { X: 0, O: 0 };
  document.getElementById('x-score').textContent = '0';
  document.getElementById('o-score').textContent = '0';
  resetBoard();
});

document.getElementById('menu-button').addEventListener('click', () => {
  alert("Sidebar menu not implemented in this version.");
});

resetBoard();
