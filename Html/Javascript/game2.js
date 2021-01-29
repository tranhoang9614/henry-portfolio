function clear() {
    gameBoard.classList.remove("x");
    gameBoard.classList.remove("o");
    cells.forEach((cell) => {
        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("win");
    });
    restartButton.innerText = "Restart";
    startGame();
}

//////////////////////////////////////////////////////

// Get HTML Elements
const cells = document.querySelectorAll("[cell-data]");
const gameBoard = document.getElementById("Tic-tac-toe");
const restartButton = document.getElementById("reStart");
const gameMode = document.getElementById("gameMode");

// Assign global variables
var playerTurn; // true (player turn) or false (computer turn)
var computerMode; // true (vs Computer) or false (vs Player)
var winner;
var draw;
const winningCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// initial setup, apply when page first load.
initialSetup();
function initialSetup() {
    if (computerMode === undefined) {
        computerMode = true;
    }

    if (computerMode === undefined) {
        playerTurn = false;
    }

    startGame();
}

// startGame, apply for each new game
function startGame() {
    winner = false;
    draw = false;
    cells.forEach((cell) => {
        cell.addEventListener("click", cellClick, { once: true });
    });
    startTurn();
}

// endGame, apply to stop current game
function endGame(winningCase) {
    if (winningCase !== undefined) {
        for (let i = 0; i < winningCase.length; i++) {
            cells[winningCase[i]].classList.add("win");
        }
    }
    cells.forEach((cell) => {
        cell.removeEventListener("click", cellClick, { once: true });
    });
}

// startTurn, apply for each new turn
function startTurn() {
    playerTurn = !playerTurn;
    setBoardMark();

    if (playerTurn) {
        // wait for user click
    } else {
        if (computerMode) {
            availableCells();
        } else {
            // wait for user click
        }
    }
}

// cellClick, apply for user turn
async function cellClick(event) {
    var currentClass;
    var cell = event.target;
    if (playerTurn) {
        currentClass = "x";
    } else {
        if (!computerMode) {
            currentClass = "o";
        } else {
            setBoardMark();
            currentClass = "x";
        }
    }

    Processing(cell, currentClass);
}

function Processing(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.removeEventListener("click", cellClick, { once: true });

    if (checkWinner(currentClass)) {
        var Message = "Restart: " + "'s win";
        restartButton.innerText = Message;
    }

    if (!winner) {
        draw = checkDraw();
    }

    if (draw) {
        restartButton.innerText = "Restart: Draw";
    } else {
        if (!winner && !draw) {
            restartButton.innerText = "Restart";
            startTurn();
        }
    }
}

function checkWinner(currentClass) {
    return winningCases.some((winningCase) => {
        var checkpoint = winningCase.every((index) => {
            return cells[index].classList.contains(currentClass);
        });

        if (checkpoint) {
            winner = true;
            restartButton.innerText =
                "Restart: " + currentClass.toUpperCase() + "'s win";
            endGame(winningCase);
        } else {
            // checkDraw();
        }
    });
}

function checkDraw() {
    return [...cells].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("o");
    });
}

function setBoardMark() {
    gameBoard.classList.remove("x");
    gameBoard.classList.remove("o");
    if (playerTurn) {
        gameBoard.classList.add("x");
    } else {
        gameBoard.classList.add("o");
    }
}

restartButton.addEventListener("click", () => {
    clear();
});

gameMode.addEventListener("click", () => {
    switch (true) {
        case gameMode.textContent.indexOf("Off") !== -1:
            gameMode.innerHTML = "Computer: Easy";
            computerMode = true;
            break;
        case gameMode.textContent.indexOf("Easy") !== -1:
            gameMode.innerHTML = "Computer: You can't win me";
            computerMode = true;
            break;
        case gameMode.textContent.indexOf("You can't win me") !== -1:
            gameMode.innerHTML = "Computer: Off";
            computerMode = false;
            break;
    }
    clear();
});

// computerPlay, apply on computerMode only
function availableCells() {
    var currentBoard = [...cells];
    var availableIndex = [];

    currentBoard.forEach((cell, index) => {
        switch (true) {
            case cell.classList.contains("x"):
                currentBoard[index] = "X";
                break;
            case cell.classList.contains("o"):
                currentBoard[index] = "O";
                break;
            default:
                currentBoard[index] = "";
                availableIndex.push(index);
                break;
        }
    });
    if (gameMode.textContent.indexOf("Easy") !== -1) {
        randomPlay(availableIndex);
    } else {
        optimalPlay(currentBoard, availableIndex);
    }
}

function randomPlay(availableIndex) {
    // for easy computer game
    if (availableIndex.length === 0) {
    } else {
        var Choose =
            availableIndex[Math.floor(Math.random() * availableIndex.length)];
        Processing(cells[Choose], "o");
    }
}

async function optimalPlay(currentBoard, availableIndex) {
    // for easy computer game
    if (availableIndex.length === 0) {
    } else {
        var Choose = await optimalMove(currentBoard);
        if (Choose === -1) {
            randomPlay(availableIndex);
        } else {
            Processing(cells[Choose], "o");
        }
    }
}

async function optimalMove(currentBoard) {
    // input: Current Board
    // output: Best Move (Win, then not Lose
    var cellIndex = await optimizePoint(currentBoard, "O", 0);
    return cellIndex;
}

async function optimizePoint(currentBoard, Mark, level) {
    if (level > 7) {
        return -1;
    } else {
        var available = availableCellsJS(currentBoard);

        // ==> Function to expand
        for (let j = 0; j < available.length; j++) {
            var i = available[j];
            var tempBoard = [...currentBoard];
            tempBoard[i] = Mark;

            // Check Win case
            if (checkWinnerJS(tempBoard, Mark)) {
                // return Win index, stop if win case found
                return i;
            }
        }

        // ==> Go deeper if Win case not found
        if (Mark === "O") {
            Mark = "X";
        } else {
            Mark = "O";
        }

        for (let k = 0; k < available.length; k++) {
            var x = available[k];
            var tempBoard = [...currentBoard];
            tempBoard[x] = Mark;

            var cellIndex = await optimizePoint(currentBoard, Mark, level + 1);
            return cellIndex;
        }
    }
}

function checkWinnerJS(Board, Mark) {
    return winningCases.some((winningCase) => {
        return winningCase.every((index) => {
            return Board[index] === Mark;
        });
    });
}

function availableCellsJS(Board) {
    var currentBoard = [...Board];
    var availableIndex = [];

    currentBoard.forEach((cell, index) => {
        if (currentBoard[index] === "") {
            availableIndex.push(index);
        }
    });

    return availableIndex;
}
