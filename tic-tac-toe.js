let gameGo = ["","", "", "", "", "", "", "", ""];

let gamePlay = true;
let player = "X";
const board = document.querySelector('.alert');

const message = () => `Player ${player} wins!`;
const draw = () => `Cat's game! No one wins.`;
const turn = () => `${player}'s turn`;

board.innerHTML = turn();

function cellPlayed(clickedCell, clickedCellIndex) {
    gameGo[clickedCellIndex] = player;
    clickedCell.innerHTML = player;
}

function playerChange() {
    player = player === "X" ? "O" : "X";
    board.innerHTML = turn();
}

const winnings = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function result() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
        const winning = winnings[i];
        let a = gameGo[winning[0]];
        let b = gameGo[winning[1]];
        let c = gameGo[winning[2]];
        if (a === '' || b === '' ||c === '') {
            continue;
        }
        if (a === b && b === c) {
            win = true;
            break
        }
    }
    if (win) {
        board.innerHTML = message();
        gamePlay = false;
        return;
    }
    let drawn = !gameGo.includes('');
    if (drawn) {
        board.innerHTML = draw();
        gamePlay = false;
        return;
    }
    playerChange();
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-index')
    );

    if (gameGo[clickedCellIndex] !== "" ||!gamePlay) {
        return;
    }

    cellPlayed(clickedCell, clickedCellIndex);
    result();
}

function restartGame() {
    gamePlay = true;
    player = "X";
    gameGo = ["", "", "", "", "", "", "", "", ""];
    board.innerHTML = turn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.restart').addEventListener('click', restartGame);


