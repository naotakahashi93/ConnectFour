/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array


for (let i=0; i<HEIGHT; i++){ // add each row in the array (the height)
  board.push([]);
  // console.log(board[i])

  for (let j=0; j < WIDTH; j++){ // within each row add the individual null elements (width - we want 7 null elements in each row)
    board[i].push(null); //push the null elements in each row (represented by board[i] i is referring to height)
  }

}
return board 
}


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
let htmlBoard = document.querySelector('#board')
  // TODO: add comment for this code
  var top = document.createElement("tr"); //creating a table row element called top (referring to the top row of the board with the dotted line boxes)
  top.setAttribute("id", "column-top"); // giving that table row element an id called "column-top";
  top.addEventListener("click", handleClick); // when the top element is clicked we are calling the handleClick funcion 

  for (var x = 0; x < WIDTH; x++) { //this for loop creates the very top row/cell of the game where you select where you wanna put your chip in (dotted lines)
    var headCell = document.createElement("td"); // we are creating a td (cell) 7 times (the length of the WIDTH) in the top row 
    headCell.setAttribute("id", x); // then adding an id to it which is the x value in the loop, so the first td has an id of 0, the next has id of 1, the next has id of 2 until 6.
    top.append(headCell); // we are appending the headCell to the toprow 
  }
  htmlBoard.append(top); // we are appending top row to the htmlBoard itself 

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {  //this loop and nested loop creates the gameboard itself with the solic lines
    const row = document.createElement("tr"); // we are creating each row (tr) 6 times (the height of the board)
    for (var x = 0; x < WIDTH; x++) { // and then looping over each row and 
      const cell = document.createElement("td"); //creating a cell (td) to each row 7 times (the length of the WIDTH)
      cell.setAttribute("id", `${y}-${x}`); // we are adding the id of "y-x" in each cell, the y represents numbers 0-5 (the height) and the x represents the numbers 0-6 (the width)
      row.append(cell); // we are then appending the cell in each row
    }
    htmlBoard.append(row); //appending the row (with the cells in it) to the htmlBoard itself  
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
for (let y = HEIGHT-1; y >= 0; y--){ // we are looping throigh the column and starting at the highest y column (which is height -1 givng us 5)
  if(!board[y][x]){ // if the cell is the board is empty then we return the value of y so inset the cell there
    return y
  }
}
  return null; // if it is not then we return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  const chip = document.createElement("div"); //creating the div element which represents the chip
  chip.classList.add("piece,") // adding the "piece" class 
  chip.classList.add(`player${currPlayer}`) // adding the current player (1 or 2) // the variable currplayer is defined at the top


  const usedSpot = document.getElementById(`${y}-${x}`) // this gives us the cell that the user put the chip in
  console.log("usedSpot", usedSpot);
  usedSpot.append(chip); // we are appending the chip (the div element) in the usedspot cell (which is a td) so the chip shows within the cell
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  console.log("event target", x, board);

 


  

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x); 
  if (y === null) { // if the y variable (height) is null then return
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
 
  board[y][x] = currPlayer; // the board[y][x] gives us the cell - y is the rows and x is the cells within the rows
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame 

  if (board.every(val => (val.every(v => v !== null)))){ //if statement to go through every row to check if the v within the val is NOT null to make sure it has a value in it 
    endGame("Tie!") // call endGame function with the message "tie"
  }




  // switch players
  // TODO: switch currPlayer 1 <-> 2

  if (currPlayer === 1){ // when the current player is 1 
    currPlayer = 2; // switch it to 2 
  }
  else currPlayer = 1; // if else and the current player is 2 switch to 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every( //checking every ell to see if they all match these conditions
      ([y, x]) =>
        y >= 0 &&  // if y is greater than or equal to 0 and 
        y < HEIGHT && // y is greater than height
        x >= 0 && // x is greater than or equal to 0 and 
        x < WIDTH && // x is less than width
        board[y][x] === currPlayer // and if the cells match the current player aka they are the same color
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) { //looping through columns 
    for (var x = 0; x < WIDTH; x++) { //looping through cells within the columns
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; //setting a variable which is an array for a horizantal win 
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; //setting a variable which is an array for a vertical win 
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; //setting a variable which is an array for a diagonal right win 
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; //setting a variable which is an array for a diagonal left win 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if any of these wins occur we return true 
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard()