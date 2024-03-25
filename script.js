function player(mark, name) {
    return {mark, name};
}

const player1 = player('X', 'Xavier');
const player2 = player('O', 'Orin');

//references to each of the squares
//I'm getting the references here so that they only have to be made once
const square00 = document.querySelector(".square00");
const square01 = document.querySelector(".square01");
const square02 = document.querySelector(".square02");
const square10 = document.querySelector(".square10");
const square11 = document.querySelector(".square11");
const square12 = document.querySelector(".square12");
const square20 = document.querySelector(".square20");
const square21 = document.querySelector(".square21");
const square22 = document.querySelector(".square22");

const gameBoard = (function() {
    let board = [['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']]; //initialize blank board
    /* for (x,y)
        (0,0) (0,1) (0,2)
        (1,0) (1,1) (1,2)
        (2,0) (2,1) (2,2)
    */

    const makeMove = (letter, x, y) => {
        board[x][y] = letter;
        console.log(checkWinner(board));
        displayBoard(board, [[square00, square01, square02], [square10, square11, square12], [square20, square21, square22]]);
    };
    const resetBoard = () => board = [['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']];
    const getRow = (row) => board[row];

    return {board, makeMove, resetBoard, getRow};
})();

const gameManager = (function() {
    const players = [player1, player2];

    const playGame = () => {
        gameBoard.resetBoard();

        for (const player of players) {
            //regular input
        }
    }

    return {players, playGame};
})();

function checkWinner(board) { //tells if board array is won by 'X', 'O', or 'N' (none)
    const allEqual = arr => arr.every( v => v === arr[0] )

    for (let i = 0; i<3; i++) {
        //if 3-across
        if (allEqual(board[i]) && board[i][0]!='N') {
            return board[i][0];
        }
        //if 3-down
        else if (allEqual([board[0][i], board[1][i]], board[2][i]) && board[0][i]!='N') {
            return board[0][i];
        }
    }

    //if diagonal 00-22
    if ((board[0][0] == board[1][1] && board[1][1] == board[2][2]) && board[0][0]!='N') {
        return board[1][1];
    }
    //if diagonal 02-20
    else if ((board[0][2] == board[1][1] && board[1][1] == board[2][0]) && board[0][2]!='N') {
        return board[1][1];
    }

    return 'N';
}

function displayBoard(board, marks) {
    //display to console
    console.log(gameBoard.getRow(0));
    console.log(gameBoard.getRow(1));
    console.log(gameBoard.getRow(2));

    //loop through board and update corresponding mark divs
    for (let i = 0; i<3; i++) {
        for (let j = 0; j<3; j++) {
            if (board[i][j] != 'N') {marks[i][j].innerHTML = board[i][j];}
        }
    }
}
