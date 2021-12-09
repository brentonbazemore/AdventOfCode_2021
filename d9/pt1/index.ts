import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

type Grid = { [x: number]: { [ y: number]: number }};

const WIDTH = data[0].length;
const HEIGHT = data.length;

const safeAdd = (grid: Grid, x: number, y: number, value: number) => {
  if (!grid[x]) {
    grid[x] = {};
  }

  grid[x][y] = value;
};

const heightMap: Grid = {};
for (let i = 0; i < data.length; i++) {
  const row = data[i];
  for (let j = 0; j < row.length; j++) {
    const cell = +row[j];

    safeAdd(heightMap, j, i, cell);
  }
}

const checkHeight = (grid: Grid, x: number, y: number) => {
  const surrounding = [ grid[x]?.[y + 1], grid[x + 1]?.[y], grid[x]?.[y - 1], grid[x - 1]?.[y] ].filter((v) => v !== undefined);
  const value = grid[x][y];

  return value < Math.min(...surrounding);
}

let sum = 0;
for (let x = 0; x < WIDTH; x++) {
  for (let y = 0; y < HEIGHT; y++) {
    if (checkHeight(heightMap, x, y)) {
      sum += (heightMap[x][y] + 1);
    }
  }
}

console.log(sum);