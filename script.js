const board = document.getElementById('gameBoard');
const cells = Array.from(document.querySelectorAll('.cell'));
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X'; // 'X' or 'O'
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleClick = (e) => {
    const index = e.target.dataset.index;

    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);

    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} Wins!`), 10);
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell)) {
        setTimeout(() => alert('It\'s a Draw!'), 10);
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
};

const restartGame = () => {
    gameState = Array(9).fill(null);
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
};

board.addEventListener('click', handleClick);
restartBtn.addEventListener('click', restartGame);
