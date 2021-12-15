import * as fs from 'fs';
import Graph from 'node-dijkstra';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const genKey = (x: number, y: number) => `${x}_${y}`;

const TRUE_WIDTH = data[0].length;
const TRUE_HEIGHT = data.length;
const getPoint = (x: number, y: number) => {
  const xOffset = Math.floor(x / TRUE_WIDTH);
  const yOffset = Math.floor(y / TRUE_HEIGHT);

  const value = +data[y % TRUE_HEIGHT][x % TRUE_WIDTH] + xOffset + yOffset;
  return value > 9 ? value - 9 : value;
}

const fullMap: { [x: number]: { [y: number]: number }} = {};
const WIDTH = TRUE_WIDTH * 5;
const HEIGHT = TRUE_HEIGHT * 5;
for (let x = 0; x < WIDTH; x++) {
  for (let y = 0; y < HEIGHT; y++) {
    if (!fullMap[x]) {
      fullMap[x] = {};
    }

    fullMap[x][y] = getPoint(x, y);
  }
}

const route = new Graph();
for (let x = 0; x < WIDTH; x++) {
  for (let y = 0; y < HEIGHT; y++) {
    const neighbors = [
      [x, y + 1],
      [x + 1, y],
      [x, y - 1],
      [x - 1, y]
    ];

    const adj: { [key: string]: number } = {};
    neighbors.forEach(([nx, ny]) => {
      if (fullMap[nx]?.[ny] != null) {
        adj[genKey(nx, ny)] = +fullMap[nx][ny];
      }
    });

    route.addNode(genKey(x, y), adj);
  }
}

const out: string[] = route.path(genKey(0, 0), genKey(WIDTH - 1, HEIGHT - 1));
let sum = 0;
out.shift();
out.forEach((coord: string) => {
  const [x, y] = coord.split('_').map(v => +v);
  sum += fullMap[x][y];
});

console.log('result', sum);
