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

class LowPoint {
  x: number;
  y: number;
  value: number;
  key: string;

  constructor(grid: Grid, x: number, y: number) {
    this.x = x;
    this.y = y;
    this.value = grid[x]?.[y];
    this.key = `${x}_${y}`;
  }
}

const lowPoints: LowPoint[] = [];
for (let x = 0; x < WIDTH; x++) {
  for (let y = 0; y < HEIGHT; y++) {
    if (checkHeight(heightMap, x, y)) {
      lowPoints.push(new LowPoint(heightMap, x, y));
    }
  }
}

const findBasin = (grid: Grid, lowPoint: LowPoint, seen: Set<string>) => {
  const { x, y } = lowPoint;
  const surroundingPoints = [ 
    new LowPoint(grid, x, y + 1), 
    new LowPoint(grid, x + 1, y), 
    new LowPoint(grid, x, y - 1), 
    new LowPoint(grid, x - 1, y) 
  ].filter(point => point.value !== 9 && point.value != null && !seen.has(point.key));

  surroundingPoints.forEach((p) => {
    seen.add(p.key);
    findBasin(grid, p, seen);
  });

  return seen.size;
}

let basins = lowPoints.map((point) => {
  const set = new Set<string>();
  set.add(point.key);
  return findBasin(heightMap, point, set);
});

basins = basins.sort((a, b) => b - a);

const out = basins[0] * basins[1] * basins[2];

console.log(out);