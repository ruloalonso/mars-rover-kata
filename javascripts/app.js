var rover1 = {
  name: 'Gallopa',
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
}

var rover2 = {
  name: 'Stormbringer',
  direction: "N",
  x: 1,
  y: 1,
  travelLog: []
}

var obstacle = {
  x: 2,
  y: 3
}

const xLimit = 10;
const yLimit = 10;
var activeRover = rover1;

function turnLeft(rover){
  switch(rover.direction) {
    case 'N':
        rover.direction = 'W';
        break;
    case 'E':
        rover.direction = 'N';
        break;
    case 'S':
        rover.direction = 'E';  
        break;
    case 'W':
        rover.direction = 'S';
        break;
  }
  whereIs(rover);
}

function turnRight(rover){
  switch(rover.direction) {
    case 'N':
        rover.direction = 'E';
        break;
    case 'E':
        rover.direction = 'S';
        break;
    case 'S':
        rover.direction = 'W';  
        break;
    case 'W':
        rover.direction = 'N';
        break;
  }
  whereIs(rover);
}

function moveBack(rover) {
  logPosition(rover);
  if (rover.direction === "N" && validatePosition(rover.x, rover.y + 1)) rover.y++; 
  if (rover.direction === "E" && validatePosition(rover.x - 1, rover.y)) rover.x--;
  if (rover.direction === "S" && validatePosition(rover.x, rover.y - 1)) rover.y--;
  if (rover.direction === "W" && validatePosition(rover.x + 1, rover.y)) rover.x++;
  whereIs(rover);
}

function moveForward(rover) {
  logPosition(rover);
  if (rover.direction === "N" && validatePosition(rover.x, rover.y - 1)) rover.y--;
  if (rover.direction === "E" && validatePosition(rover.x + 1, rover.y)) rover.x++;
  if (rover.direction === "S" && validatePosition(rover.x, rover.y + 1)) rover.y++;
  if (rover.direction === "W" && validatePosition(rover.x - 1, rover.y)) rover.x--;
  whereIs(rover);
}

function whereIs(rover) {
  console.log("Now the rover '" + activeRover.name + "' is at [" + rover.x + "," + rover.y + "] facing " + rover.direction); 
}

function showLog(rover) {
  console.log("The rover '" + activeRover.name + "' has been at:");
  console.log(rover.travelLog);
}

function logPosition(rover) {
  rover.travelLog.push([rover.x, rover.y]);
}

function move(command) {
  let move = false;
  for (let i = 0; i < command.length; i++) {
    if (command[i] === 'f') {
      moveForward(activeRover);
      move = true;
    } else if (command[i] === 'b') {
      moveBack(activeRover);
      move = true;  
    } else if (command[i] === 'l') {
      turnLeft(activeRover);
    } else if (command[i] === 'r') {
      turnRight(activeRover);   
    } else console.log('Unknown command');
  }
  if (move) {
    showLog(activeRover);
    changeTurn();
  }
}

function validatePosition(x, y) {
  if (x === obstacle.x && y === obstacle.y) {
    console.log('OBSTACLE ALERT!!!');
    return false;
  }  
  if (x > xLimit || y > yLimit || x < -xLimit || y < -yLimit) {
    console.log('OUT OF BOUNDS!!!');
    return false;
  }
  if ((x === rover1.x && y === rover1.y) || (x === rover2.x && y === rover2.y)) {
    console.log('CRASH!!! GAME OVER!!!');
    return false;
  }
  return true;
}

function start() {
  console.log("Welcome! To Mars Rover Explorer v0.1")
  console.log("It's rover " + activeRover.name + "'s turn");
  console.log("Type help() for... help");
}

function help() {
  console.log("Type where() to know where is your rover");
  console.log("Type move('command') to move your rover");
  console.log("Commands available:");
  console.log("'f' to move forward");
  console.log("'b' to move back");
  console.log("'r' to turn right");
  console.log("'l' to turn left");
  console.log("Example: move('ffffrfflb')");
}
function changeTurn() {
  if (activeRover === rover2) {
    activeRover = rover1;
    console.log("Ok now it's rover " + activeRover.name + "'s turn");
  } else {
    activeRover = rover2;
    console.log("Now it's rover " + activeRover.name + "'s turn");
  }
}

function where() {
  console.log("It's " + activeRover.name + "'s turn.");
  console.log("It's at [" + activeRover.x + "," + activeRover.y + "] facing " + activeRover.direction);
}

function pass() {
  changeTurn();
}

start();
