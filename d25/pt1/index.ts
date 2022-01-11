import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const HEIGHT = data.length;
const WIDTH = data[0].length;

type Grid = { [x: number]: { [y: number]: '.' | '>' | 'v' }};

let cucumberGrid: Grid = {};
for (let y = 0; y < HEIGHT; y++) {
  for (let x = 0; x < WIDTH; x++) {
    if (!cucumberGrid[x]) {
      cucumberGrid[x] = {};
    }

    cucumberGrid[x][y] = data[y][x] as '.' | '>' | 'v';
  }
}

const moveEast = () => {
  let newGrid: Grid = JSON.parse(JSON.stringify(cucumberGrid));

  let diff = 0;
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const nextX = (x + 1) % WIDTH;
      if (cucumberGrid[x][y] === '>' && cucumberGrid[nextX][y] === '.') {
        // then move it
        newGrid[x][y] = '.';
        newGrid[nextX][y] = '>';
        diff++;
      } else {
        // leave it
      }
    }
  }

  cucumberGrid = newGrid;

  return diff;
}

const moveDown = () => {
  let newGrid: Grid = JSON.parse(JSON.stringify(cucumberGrid));

  let diff = 0;
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const nextY = (y + 1) % HEIGHT;
      if (cucumberGrid[x][y] === 'v' && cucumberGrid[x][nextY] === '.') {
        // then move it
        diff++;
        newGrid[x][y] = '.';
        newGrid[x][nextY] = 'v';
      } else {
        // leave it
      }
    }
  }

  cucumberGrid = newGrid;

  return diff;
}

const logGrid = () => {
  for (let y = 0; y < HEIGHT; y++) {
    let line = '';
    for (let x = 0; x < WIDTH; x++) {
      line += cucumberGrid[x][y];
    }
    console.log(line);
  }
}

let i = 0;
while (true) {
  let diff = 0;
  diff += moveEast();
  diff += moveDown();

  if (diff === 0) {
    break;
  }

  i++;
}

logGrid();
console.log(i + 1, 'steps');
