import * as fs from 'fs';
import findShortestPath = require('./dijkstras');

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const genKey = (x: number, y: number) => `${x}_${y}`;

const cavernGraph: { [key: string]: { [key: string]: number }} = {};

const WIDTH = data[0].length;
const HEIGHT = data.length;
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
      if (data[ny]?.[nx] != null) {
        adj[genKey(nx, ny)] = +data[ny][nx];
      }
    });

    cavernGraph[genKey(x, y)] = adj;
  }
}

const out = findShortestPath(cavernGraph, genKey(0, 0), genKey(WIDTH - 1, HEIGHT - 1));
console.log(out.distance);
