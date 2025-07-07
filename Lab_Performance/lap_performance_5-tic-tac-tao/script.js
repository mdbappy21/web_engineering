const cells = document.querySelectorAll('td');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function handleCellClick(e) {
  const clickedCell = e.target;
  const cellIndex = parseInt(clickedCell.getAttribute('data-cell'));

  if (board[cellIndex] !== '' || !gameActive) {
    return;
  }

  updateCell(clickedCell, cellIndex);
  checkResult();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('disabled');
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  let currentPlayerName= currentPlayer==='X'?'1':'2';
  statusDiv.textContent = `Player ${currentPlayerName}'s turn`;
}

function checkResult() {
  let roundWon = false;
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] === '' || board[b] === '' || board[c] === '') {
      continue;
    }
    if (board[a] === board[b] && board[b] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    let currentPlayerName= currentPlayer==='X'?'1':'2';
    statusDiv.textContent = `Player ${currentPlayerName} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusDiv.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  changePlayer();
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = '1';
  gameActive = true;
  statusDiv.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('disabled');
  });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);