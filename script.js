function checkGameEnd(gameBoard) { //takes gameboard MODULE, tells if game is won by 'X', 'O', or 'N' (none)

}
function displayBoard(gameBoard) { //takes gameboard MODULE, displays on screen
    //for now, just display to console

}
function player(mark, name) {
    return {mark, name};
}

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
    player1 = player('X', 'Xavier');
    player2 = player('O', 'Orin');
})();