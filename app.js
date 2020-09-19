// HTML elements 
const statusDiv = document.querySelector('.status'); 
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell'); // array

// game constants
const xSymbol = '×';
const oSymbol = '○';

// Game variables
let liveGame = true; // Bool for status of game
let turnX = true; // Bool for turn of x and o
let winner = null;

// functions
const letterToSymbol = (letter) => letter == 'x' ? xSymbol : oSymbol;

const handleWin = (letter) => {
     liveGame = false;
     winner = letter;
     if (winner == 'x') {
          statusDiv.innerHTML = `${letterToSymbol(winner)} has won!`;
     } else {
          statusDiv.innerHTML = `<span>${letterToSymbol(winner)} has won!</span>`;
     }
};

const checkGameStatus = () => {
     const topL = cellDivs[0].classList[1];
     const topM = cellDivs[1].classList[1];
     const topR = cellDivs[2].classList[1];
     const midL = cellDivs[3].classList[1];
     const midM = cellDivs[4].classList[1];
     const midR = cellDivs[5].classList[1];
     const botL = cellDivs[6].classList[1];
     const botM = cellDivs[7].classList[1];
     const botR = cellDivs[8].classList[1];

     // Check for winner
     if (topL && topL === topM && topL === topR) {
          handleWin(topL);
          cellDivs[0].classList.add('win');
          cellDivs[1].classList.add('win');
          cellDivs[2].classList.add('win');
     } else if (midL && midL === midM && midL === midR) {
          handleWin(midL);
          cellDivs[3].classList.add('win');
          cellDivs[4].classList.add('win');
          cellDivs[5].classList.add('win');
     } else if (botL && botL === botM && botL === botR) {
          handleWin(botL);
          cellDivs[6].classList.add('win');
          cellDivs[7].classList.add('win');
          cellDivs[8].classList.add('win');
     } else if (topL && topL === midL && topL === botL) {
          handleWin(topL);
          cellDivs[0].classList.add('win');
          cellDivs[3].classList.add('win');
          cellDivs[6].classList.add('win');
     } else if (topM && topM === midM && topM === botM) {
          handleWin(topM);
          cellDivs[1].classList.add('win');
          cellDivs[4].classList.add('win');
          cellDivs[7].classList.add('win');
     } else if (topR && topR === midR && topR === botR) {
          handleWin(topR);
          cellDivs[2].classList.add('win');
          cellDivs[5].classList.add('win');
          cellDivs[8].classList.add('win');
     } else if (topL && topL === midM && topL === botR) {
          handleWin(topL);
          cellDivs[0].classList.add('win');
          cellDivs[4].classList.add('win');
          cellDivs[8].classList.add('win');
     } else if (topR && topR === midM && topR == botL) {
          handleWin(topR);
          cellDivs[2].classList.add('win');
          cellDivs[4].classList.add('win');
          cellDivs[6].classList.add('win');
     } else if (topL && topM && topR && midL && midM && midR && botL && botM && botR) {
          // Handle ties games
          liveGame = false;
          statusDiv.innerHTML = 'TIE!';
     } else {
          // handle live games
          turnX = !turnX;
          if (turnX) {
               statusDiv.innerHTML = `${xSymbol} is next`;
          } else {
               statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
          }
     }
};

// Event handlers
const handleReset = () => {
     turnX = true;
     statusDiv.innerHTML = `${xSymbol} is next`;
     winner = null;

     for (cellDiv of cellDivs) {
          cellDiv.classList.remove('x');
          cellDiv.classList.remove('o');
          cellDiv.classList.remove('win');
     }

     liveGame = true;
};

const handleGameCell = (e) => {
     const classList = e.target.classList;

    if (liveGame === false) {
         return;
    }

    // Check that game-cell does not have an x or o already in the cell
    if (classList[1] == 'x' || classList[1] == 'o'){
         return;
    }

    if (turnX) {
         // Add class to have x turn
         classList.add('x');
         checkGameStatus();
    } else {
         // o turn
         classList.add('o');
         checkGameStatus();
    }
};


// Event listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
     cellDiv.addEventListener('click', handleGameCell)
}