function player(mark, name) {
    let wins = 0;

    const getWins = () => wins;
    const addWin = () => wins++;
    return {mark, name, getWins, addWin};
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

    const setMark = (mark, x, y) => board[x][y] = mark;
    const resetBoard = () => board = [['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']];
    const getRow = (row) => board[row];
    const checkWinner = () => { //tells if board array is won by 'X', 'O', or 'N' (none)
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

    const startGame = () => {
        gameBoard.resetBoard();
        
    };
    const makeMove = (x, y) => {
        gameBoard.setMark(turn, x, y);
        gameBoard.checkWinner(gameBoard);
        displayBoard(squares);

        //swap turn upon completion
        if (turn == 'X') {turn = 'O';}
        else {turn = 'X';}
    };

    return {players, startGame, makeMove};
})();

function displayBoard(squares) {
    //display to console
    console.log(gameBoard.getRow(0));
    console.log(gameBoard.getRow(1));
    console.log(gameBoard.getRow(2));

    //loop through board and update corresponding mark divs
    for (let i = 0; i<3; i++) {
        for (let j = 0; j<3; j++) {
            if (gameBoard.getRow(i)[j] != 'N') {squares[i*3+j].innerHTML = gameBoard.getRow(i)[j];}
        }
    }
}

gameManager.startGame();