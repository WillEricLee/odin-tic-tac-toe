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

    const makeMove = (letter, x, y) => board[x, y] = letter;
    const resetBoard = () => board = [['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']];
})();

const gameManager = (function() {
    const players = [player1, player2];

    const playGame = () => {
        gameBoard.resetBoard();

        for (const player of players) {
            //regular input
        }
    }
})();

function checkGameEnd() { //tells if gameBoard module is won by 'X', 'O', or 'N' (none)

    for (let i = 0; i<3; i++) {
        //if 3-across
        if (allEqual(gameBoard[i]) && gameBoard[i][0]!='N') {
            return gameBoard[i][0];
        }
        //if 3-down
        else if (allEqual([gameBoard[0][i], gameBoard[1][i]], gameBoard[2][i]) && gameBoard[0][i]!='N') {
            return gameBoard[0][i];
        }
    }

    //if diagonal 00-22
    if ((gameBoard[0][0] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][2]) && gameBoard[0][0]!='N') {
        return gameBoard[1][1];
    }
    //if diagonal 02-20
    else if ((gameBoard[0][2] == gameBoard[1][1] && gameBoard[1][1] == gameBoard[2][0]) && gameBoard[0][2]!='N') {
        return gameBoard[1][1];
    }

    return 'N';
}
function displayBoard() { //takes gameboard MODULE, displays on screen
    //for now, just display to console
    console.log(gameBoard[0]);
    console.log(gameBoard[1]);
    console.log(gameBoard[2]);
}