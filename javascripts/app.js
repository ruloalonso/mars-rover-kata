// Rover Object Goes Here
// ======================

var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
}

var obstacle = {
  x: 2,
  y: 3,
  message: 'hola rover! pinchaste'
}

const xLimit = 10;
const yLimit = 10;

// ======================
function turnLeft(){
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
  whereIs();
}

function turnRight(){
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
  whereIs();
}

function moveBack() {
  logPosition();
  if (rover.direction === "N" && rover.y < 10) rover.y++;
  if (rover.direction === "E" && rover.x > -10) rover.x--;
  if (rover.direction === "S" && rover.y > -10) rover.y--;
  if (rover.direction === "W" && rover.x < 10) rover.x++;
  whereIs();
}

function moveForward() {
  logPosition();
  if (rover.direction === "N" && rover.y > -10) rover.y--;
  if (rover.direction === "E" && rover.x < 10) rover.x++;
  if (rover.direction === "S" && rover.y < 10) rover.y++;
  if (rover.direction === "W" && rover.x > -10) rover.x--;
  whereIs();
}

function whereIs() {
  console.log("Now the rover is at " + rover.x + "," + rover.y + " facing " + rover.direction); 
}

function showLog() {
  console.log("The rover has been at:");
  console.log(rover.travelLog);
}

function logPosition() {
  rover.travelLog.push([rover.x, rover.y]);
}

function command(command) {
  let move = false;
  for (let i = 0; i < command.length; i++) {
    if (command[i] === 'f') {
      moveForward();
      move = true;
    } else if (command[i] === 'b') {
      moveBack();
      move = true;  
    } else if (command[i] === 'l') {
      turnLeft();
    } else if (command[i] === 'r') {
      turnRight();   
    } else console.log('Unknown command');
  }
  if (move) showLog();
}

function validateMove(x, y) {
  if (x === obstacle.x && y === obstacle.y) {
    console.log('OBSTACLE ALERT!!!');
    return false;
  }  
  if (x > xLimit || y > yLimit || x < -xLimit || y < -yLimit) {
    console.log('OUT OF BOUNDS!!!');
    return false;
  }
  return true;
}