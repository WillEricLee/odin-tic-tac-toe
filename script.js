function player(mark,  number) {
    let wins = 0;
    let name = '';
    let playerID = "player" + number.toString();
    const winsCounter = document.getElementById(playerID);

    const getWins = () => wins;
    const resetWins = () => {
        wins = 0;
        winsCounter.innerHTML = wins;
    };
    const addWin = () => {
        wins++;
        winsCounter.innerHTML = wins;
    };
    const setName = (newName) => {
        name = newName;    
    }
    const getName = () => name;
    return {mark, getWins, resetWins, addWin, setName, getName};
}

const player1 = player('X', 1);
const player2 = player('O', 2);

const gameBoard = (function() {
    let board = [['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']]; //initialize blank board
    /* for (x,y)
        (0,0) (0,1) (0,2)
        (1,0) (1,1) (1,2)
        (2,0) (2,1) (2,2)
    */

    const setMark = (mark, x, y) => board[x][y] = mark;
    const resetBoard = () => board = [['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']];
    const getRow = (row) => board[row];
    const checkWinner = () => { //tells if board array is won by 'X', 'O', or 'N' (none)
        const allEqual = arr => arr.every( v => v == arr[0] )
    
        for (let i = 0; i<3; i++) {
            //if 3-across
            if (allEqual(board[i]) && board[i][0]!='N') {
                console.log("3-across on " + i);
                return board[i][0];
            }
            //if 3-down
            if (allEqual([board[0][i], board[1][i], board[2][i]]) && board[0][i]!='N') {
                console.log("3-down on " + i);
                return board[0][i];
            }
        }
    
        //if diagonal 00-22
        if ((board[0][0] == board[1][1] && board[0][0] == board[2][2]) && board[0][0]!='N') {
            console.log("00-22 win");
            return board[1][1];
        }
        //if diagonal 02-20
        if ((board[0][2] == board[1][1] && board[0][2] == board[2][0]) && board[0][2]!='N') {
            console.log("02-20 win");
            return board[1][1];
        }
    
        return 'N';
    }

    return {board, setMark, resetBoard, getRow, checkWinner};
})();

const gameManager = (function() {
    const players = [player1, player2];
    //references to each of the squares
    //I'm getting the references here so that they only have to be made once
    //and also preventing them from being global
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.addEventListener("click", () => {makeMove(square.dataset.x, square.dataset.y)});
    });

    let turn = 'X';
    let turns = 0;

    const startGame = () => {
        gameBoard.resetBoard();

        turn = 'X';
        turns = 0;

        player1.resetWins();
        player2.resetWins();

        displayBoard(squares);

        //assign names
        if (player1Input.value.length == 0) {
            player1.setName("Player 1");
        }
        else { 
            player1.setName(player1Input.value);
            console.log("player1 name: " + player1Input.value)
        }
        if (player2Input.value.length == 0) {
            player2.setName("Player 2");
        }
        else { 
            player2.setName(player2Input.value);
        }

        //display names
        const player1Display = document.getElementById('player1-wins-header');
        const player2Display = document.getElementById('player2-wins-header');
        console.log("" + player1.getName() + ' wins:');
        player1Display.innerHTML = "" + player1.getName() + ' wins:';
        player2Display.innerHTML = "" + player2.getName() + ' wins:';
    };

    const newRound = () => {
        gameBoard.resetBoard();

        turn = 'X';
        turns = 0;
    }

    const makeMove = (x, y) => {
        if (gameBoard.getRow(x)[y] == 'N') {
            gameBoard.setMark(turn, x, y);
            displayBoard(squares);
            let winner = gameBoard.checkWinner();
    
            //swap turn upon completion
            if (turn == 'X') {turn = 'O';}
            else {turn = 'X';}
            turns++;

            //if the game is won, the display stays the same but the next move will visually reset the game
            for (const player of players) {
                if (winner == player.mark) {
                    console.log("Winner: " + player.mark);
                    player.addWin();
                    newRound();
                }
            }

            if (turns==9) {
                console.log("Winner: None");
                newRound();
            }
        }
    };

    return {players, startGame, newRound, makeMove};
})();

function displayBoard(squares) {
    //display to console
    console.log("Squares:");
    console.log(gameBoard.getRow(0));
    console.log(gameBoard.getRow(1));
    console.log(gameBoard.getRow(2));

    //loop through board and update corresponding mark divs
    for (let i = 0; i<3; i++) {
        for (let j = 0; j<3; j++) {
            if (gameBoard.getRow(i)[j] != 'N') {squares[i*3+j].innerHTML = gameBoard.getRow(i)[j];}
            else {squares[i*3+j].innerHTML = "";}
        }
    }
}

const player1Input = document.querySelector(".player1");
const player2Input = document.querySelector(".player2");

const startButton = document.querySelector(".restart");
startButton.onclick = () => gameManager.startGame();