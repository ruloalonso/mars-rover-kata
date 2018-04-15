var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
}

var obstacle = {
  x: 2,
  y: 3
}

const xLimit = 10;
const yLimit = 10;

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
  whereIs(rover);
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
  logPosition();
  if (rover.direction === "N" && rover.y > -10) rover.y--;
  if (rover.direction === "E" && rover.x < 10) rover.x++;
  if (rover.direction === "S" && rover.y < 10) rover.y++;
  if (rover.direction === "W" && rover.x > -10) rover.x--;
  whereIs(rover);
}

function whereIs(rover) {
  console.log("Now the rover is at " + rover.x + "," + rover.y + " facing " + rover.direction); 
}

function showLog(rover) {
  console.log("The rover has been at:");
  console.log(rover.travelLog);
}

function logPosition(rover) {
  rover.travelLog.push([rover.x, rover.y]);
}

function command(command, rover) {
  let move = false;
  for (let i = 0; i < command.length; i++) {
    if (command[i] === 'f') {
      moveForward(rover);
      move = true;
    } else if (command[i] === 'b') {
      moveBack(rover);
      move = true;  
    } else if (command[i] === 'l') {
      turnLeft(rover);
    } else if (command[i] === 'r') {
      turnRight(rover);   
    } else console.log('Unknown command');
  }
  if (move) showLog(rover);
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
  return true;
}