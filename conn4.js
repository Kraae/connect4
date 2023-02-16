/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// General-purpose actions in the game. 
let boardGame = document.querySelector("#board");
const playerTurn = document.getElementById(".player-turn");
const p1 = document.getElementById('.p1');
const p2 = document.getElementById('.p2');
let width = 7;
let height = 6;



class game {
    constructor(height, width) {  //The constructor method is a special method of a class 
                                  //for creating and initializing an object instance of that class.
      const p1 = new Player(document.getElementById("p1").value);
      const p2 = new Player(document.getElementById("p2").value);
      let currplayer = p1;         // active player: 1 or 2
      boardGame = [];  // array of rows, each row is array of cells  (board[y][x])}
      height = height;
      width = width;
      makeBoard();
      makeHtmlBoard();
    }
}

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */ // TODO: set "board" to empty HEIGHT x WIDTH matrix array 
function makeBoard() {
// make the game flexible about the height and width of the board and use the WIDTH and HEIGHT constants
//array.from can convert string into array; push changes the length and content of the array by returning 
//a new array with the allement added to the end
for(let y = 0; y < HEIGHT; y++)
board.push(array.from({length:width}));
}

/*???
for (let x = 0; x < width.length; x++) {
  if (Game.check.isPositionTaken(x, y)) {
    width = document.querySelector('tr:nth-child(' + (1 + y) + ')');
    cells = width.querySelector('td:nth-child(' + (1 + x) + ')');
    cell.firstElementChild.classList.add(Game.board[y][x]);
  }
}
*/

/** makeHtmlBoard: make HTML table and row of column tops. */
//Print the contents ofthe game into the html page.
function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const board = document.getElementById('board');
    const game = document.createElement('div');
    game.setAttribute("id", "game");
    const table = document.createElement("table");
    table.setAttribute("id", "board");
    game.appendChild(table);
    
    //top column 
    let top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", handleClick);
    //rows 
    for (let x = 0; x < WIDTH; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }

  board.append(top);
    for (let y = 0; y < HEIGHT; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }
  

  
  function findSpotForCol(x) {
  /** findSpotForCol: given column x, return top empty y (null if filled) */
    // TODO: write the real version of this, rather than always returning 0
    // Start at the bottom of the column, and step up, checking to make sure
    // each position has been filled. If one hasn't, return the empty position.
    for(let y = height - 1; y >= 0; y--) {
        if (!board[y][x]) {
            return y;
        }
    }
  }
  
  /** placeInTable: update DOM to place piece into HTML table of board */
  // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
  function placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.classList.add("drop-in");
    piece.style.backgroundColor = currPlayer.color;
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
    //array.forEach.call(div, (piece) => {
    //    piece.addEventListener('click', changeColor);
     //   piece.style.backgroundColor = 'white';
    //})
 }

  
  /** endGame: announce game end */
   // TODO: pop up alert message
  function endGame(msg) {
    const end = document.createElement("div");
    const endGameBanner = document.querySelector("section");
    end.classList.add("end");
    endGameBanner.appendChild(end);
    const winMsg = document.createElement("h1");
    winMsg.setAttribute("id", "winMsg");
    winMsg.innerHTML = msg;
    end.append(winMsg);
    //window.alert("You Won");
  }
  
  /** handleClick: handle click of column top to play piece */
  
  function handleClick(e) {
    // get x from ID of clicked cell

    let x = +e.target.id;
    let y = findSpotForCol(x);
    let isWin = false                                                            
    if (y === null) {
      return;
    }
  
    // get next spot in column (if none, ignore click)
    let height = findSpotForCol(x);
    if (height === null) {
      return;
    }
    board[y][x] = currPlayer;
    placeInTable(y, x);
    if (checkForWin()) {
      isWin = true;
      currPlayer === p1
        ? endGame(`Player 1 wins!`)
        : endGame(`Player 2 wins!`);
    }
    if (board.every((row) => row.every((cell) => cell))) {
      return endGame("Tie!"); // check for tie
    }
    if (!isWin) {
      togglePlayer();// switch players
      currPlayer = currPlayer === p1 ? p2 : p1;
    }// TODO: switch currPlayer 1 <-> 2
  
  togglePlayer() 
    if (currPlayer === p1) {
      p1.classList.remove("currPlayer");
      p2.classList.add("currPlayer");
    } else {
      p2.classList.remove("currPlayer");
      p1.classList.add("currPlayer");
    }
  
}
    // check for win
  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  
  function checkForWin() {
    const _win = (cells) => {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < HEIGHT &&
          x >= 0 &&
          x < WIDTH &&
          board[y][x] === currPlayer
      );
    }
  
    // TODO: read and understand this code. Add comments to help you.
  
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
  


  
  class player {
    constructor(color) {
        color = color
    }
  }
