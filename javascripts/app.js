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
        printTurn(rover, 'W');
        break;
    case 'E':
        rover.direction = 'N';
        printTurn(rover, 'N');
        break;
    case 'S':
        rover.direction = 'E';  
        printTurn(rover, 'E');
        break;
    case 'W':
        rover.direction = 'S';
        printTurn(rover, 'S');
        break;
  }
}

function turnRight(rover){
  switch(rover.direction) {
    case 'N':
        rover.direction = 'E';
        printTurn(rover, 'E');
        break;
    case 'E':
        rover.direction = 'S';
        printTurn(rover, 'S');
        break;
    case 'S':
        rover.direction = 'W';  
        printTurn(rover, 'W');
        break;
    case 'W':
        rover.direction = 'N';
        printTurn(rover, 'N');
        break;
  }
}

function moveBack(rover) {
  if (rover.direction === "N") {
    if (validatePosition(rover.x, rover.y - 1)) {
      logPosition(rover);
      rover.y--;
      printMoveBackward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    };
  }
  if (rover.direction === "E")
    if (validatePosition(rover.x - 1, rover.y)) {
      logPosition(rover);
      rover.x--;
      printMoveBackward(rover, rover.x, rover.y);
      return true;
    } else {
      return false; 
    }
  if (rover.direction === "S") {
    if (validatePosition(rover.x, rover.y + 1)) {
      logPosition(rover);
      rover.y++;
      printMoveBackward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }   
  if (rover.direction === "W") {
    if (validatePosition(rover.x + 1, rover.y)) {
      logPosition(rover);
      rover.x++;
      printMoveBackward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }
}

function moveForward(rover) {  
  if (rover.direction === "N") {
    if (validatePosition(rover.x, rover.y + 1)) {
      logPosition(rover);
      rover.y++;
      printMoveForward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    };
  }
  if (rover.direction === "E")
    if (validatePosition(rover.x + 1, rover.y)) {
      logPosition(rover);
      rover.x++;
      printMoveForward(rover, rover.x, rover.y);
      return true;
    } else {
      return false; 
    }
  if (rover.direction === "S") {
    if (validatePosition(rover.x, rover.y - 1)) {
      logPosition(rover);
      rover.y--;
      printMoveForward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  }   
  if (rover.direction === "W") {
    if (validatePosition(rover.x - 1, rover.y)) {
      logPosition(rover);
      rover.x--;
      printMoveForward(rover, rover.x, rover.y);
      return true;
    } else {
      return false;
    }
  } 
}

function whereIs(rover) {
  console.log("Now the rover '" + activeRover.name + "' is at [" + rover.x + "," + rover.y + "] facing " + rover.direction); 
}

function logPosition(rover) {
  rover.travelLog.push([rover.x, rover.y]);
}

function move(command) { 
  for (let i = 0; i < command.length; i++) {
    if (command[i] === 'f') {
      if (!moveForward(activeRover)) {
        break;
      }
    } else if (command[i] === 'b') {
      moveBack(activeRover);
    } else if (command[i] === 'l') {
      turnLeft(activeRover);
    } else if (command[i] === 'r') {
      turnRight(activeRover);   
    } else console.log('Unknown command');
  }
  changeTurn();
}

function validatePosition(x, y) {
  //console.log("validatePosition debug:" + x + y);
  if (x === obstacle.x && y === obstacle.y) {
    console.log('You found LIFE on Mars!!!! ENHORABUENA!!!!');
    exit();
  }  
  if (x > xLimit || y > yLimit || x < -xLimit || y < -yLimit) {
    console.log('OUT OF BOUNDS!!! You lost your turn');
    return false;
  }
  if ((x === rover1.x && y === rover1.y) || (x === rover2.x && y === rover2.y)) {
    console.log('CRASH!!! You lost your turn');
    return false;
  }
  return true;
}

function start() {
  console.log("Welcome! To Mars Rover Explorer v0.2");
  console.log("Try to find LIFE on Mars before your opponent");
  console.log("There are 2 mars-rovers: " + rover1.name + " and " + rover2.name);
  console.log("Type help() for... help");
  printStatus();
  printPosition(activeRover);
}

function help() {
  console.log("Type info() to get info of the game");
  console.log("Type move('command') to program your rover's move");
  console.log("  - 'f' to move forward");
  console.log("  - 'b' to move back");
  console.log("  - 'r' to turn right");
  console.log("  - 'l' to turn left");
  console.log("Example: move('fflb')");
  console.log("Type pass() to pass turn");
  console.log("Type log() to show your rover's travel log");
}
function changeTurn() {
  if (activeRover === rover2) {
    activeRover = rover1;
    console.log("Ok. Now it's rover " + activeRover.name + "'s turn");
  } else {
    activeRover = rover2;
    console.log("Ok. Now it's rover " + activeRover.name + "'s turn");
  }
  printPosition(activeRover);
}

function info() {
  printPosition(rover1);
  printPosition(rover2);
  printStatus();
}

function pass() {
  changeTurn();
}

function log() {
  printLog(activeRover);
}

function printInfo(rover) {
  console.log(rover.name + "'s rover is at [" + rover.x + "," + activeRover.y + "] facing " + rover.direction);
}

function printTurn(rover, side) {
  console.log(rover.name + " turned " + side);
}

function printLog(rover) {
  console.log(rover.name + "'s Travel log: ");
  console.log(activeRover.travelLog);
}

function printMoveForward(rover, x, y) {
  console.log(rover.name + " moved forward to [" + x + "," + y + "]");
}

function printMoveBackward(rover, x, y) {
  console.log(rover.name + " moved backwars to [" + x + "," + y + "]");
}

function printPosition(rover) {
  console.log(rover.name + " is at [" + rover.x + "," + rover.y + "] facing " + rover.direction);
}

function printStatus() {
  console.log("It's " + activeRover.name + "'s turn.");
}

start();
