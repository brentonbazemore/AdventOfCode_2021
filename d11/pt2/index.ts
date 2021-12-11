import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

class Octopus {
  lightLevel: number;
  turnLastFlashed: number;

  constructor(lightLevel: number) {
    this.lightLevel = lightLevel;
    this.turnLastFlashed = -1;
  }

  tryFlash(turn: number) {
    if (this.lightLevel > 9 && this.turnLastFlashed < turn) {
      this.turnLastFlashed = turn;
      return true;
    }

    return false;
  }

  flash() {
    this.lightLevel = 0;
  }

  tick() {
    this.lightLevel++;
  }
}

type Grid = { [x: number]: { [y: number]: Octopus }}

const WIDTH = data[0].length;
const HEIGHT = data.length;
const grid: Grid = {};
for (let i = 0; i < HEIGHT; i++) {
  for (let j = 0; j < WIDTH; j++) {
    if (!grid[j]) {
      grid[j] = {};
    }

    grid[j][i] = new Octopus(+data[i][j]);
  }
}

const emitLight = (x: number, y: number, turn: number) => {
  let coords: number[][] = [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y], 
    // [x, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ];

  coords.forEach((coord) => {
    grid[coord[0]]?.[coord[1]]?.tick();
    if (grid[coord[0]]?.[coord[1]]?.tryFlash(turn)) {
      emitLight(coord[0], coord[1], turn);
    }
  });
};

const simulate = (turn: number) => {
  let flashCount = 0;
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      grid[x][y].tick();
    }
  }

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const didFlash = grid[x][y].tryFlash(turn);
      if (didFlash) {
        emitLight(x, y, turn);
      }
    }
  }

  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      if (grid[x][y].turnLastFlashed === turn) {
        grid[x][y].flash();
        flashCount++;
      }
    }
  }

  return flashCount;
}

const TURN_COUNT = 100;
let sum = 0;
for (let t = 0; t < TURN_COUNT; t++) {
  sum += simulate(t);
}

console.log(sum);

// Logging
// for (let j = 0; j < 10; j++) {
//   let str = '';
//   for (let i = 0; i < 10; i++) {
//     str += `${(grid[i] && grid[i][j]).lightLevel}`;
//   }
//   console.log(str);
// }

// console.log(grid);