let currentPlayer = 'X'; // Start with player X
let gameBoard = Array(9).fill(''); // Create an empty game board
const cells = document.querySelectorAll('.cell'); // Get all the cells
const messageBox = document.querySelector('.message-box .paragraph'); // Message box for game status
const restartButton = document.createElement('button'); // Create a restart button


restartButton.textContent = 'Restart'; // Set button text
restartButton.style.display = 'none'; // Hide it for now
document.body.appendChild(restartButton); // Add button to the body


// Add click event to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame); // Restart button click


function handleCellClick(event) {
    const index = event.target.getAttribute('data-index'); // Get index of clicked cell
    if (gameBoard[index] || messageBox.textContent.includes('wins')) return; // Ignore if already filled or game is over



    gameBoard[index] = currentPlayer; // Mark the cell
    event.target.textContent = currentPlayer; // Display current player


    if (checkWin()) { // Check if current player won
        messageBox.textContent = `${currentPlayer} wins!`; // Update message
        disableCells(); // Disable further clicks
        setTimeout(() => restartButton.style.display = 'block', 1000); // Show restart button after 1 sec
    } else if (gameBoard.every(cell => cell)) { // Check for draw
        messageBox.textContent = "It's a draw!";
        disableCells();
        setTimeout(() => restartButton.style.display = 'block', 1000);
    }


    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player

}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    return winPatterns.some(pattern => { // Check all win patterns
        const [a, b, c] = pattern; // Get indexes
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]; // Check for a winner
    });
}



function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick)); // Disable all cells
}



function restartGame() {
    gameBoard.fill(''); // Clear the board
    cells.forEach(cell => {
        cell.textContent = ''; // Reset UI
        cell.addEventListener('click', handleCellClick); // Re-enable clicks
    });
    currentPlayer = 'X'; // Reset to player X
    messageBox.textContent = 'Welcome to the game!'; // Reset message
    restartButton.style.display = 'none'; // Hide the restart button
}
