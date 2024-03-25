function player(mark, name) {
    return {mark, name};
}

const player1 = player('X', 'Xavier');
const player2 = player('O', 'Orin');

const gameBoard = (function() {
    let board = [['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']]; //initialize blank board
    /* for (x,y)
        (0,0) (0,1) (0,2)
        (1,0) (1,1) (1,2)
        (2,0) (2,1) (2,2)
    */

    //references to each of the markings, to be fed to displayBoard
    //I'm getting the references here so that they only have to be made once,
    //but not globally.
    const mark00 = document.querySelector(".mark00");
    const mark01 = document.querySelector(".mark01");
    const mark02 = document.querySelector(".mark02");
    const mark10 = document.querySelector(".mark10");
    const mark11 = document.querySelector(".mark11");
    const mark12 = document.querySelector(".mark12");
    const mark20 = document.querySelector(".mark20");
    const mark21 = document.querySelector(".mark21");
    const mark22 = document.querySelector(".mark22");

    const makeMove = (letter, x, y) => {
        board[x][y] = letter;
        console.log(checkWinner(board));
        displayBoard(board, [[mark00, mark01, mark02], [mark10, mark11, mark12], [mark20, mark21, mark22]]);
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