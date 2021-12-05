import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

interface Coordinates {
  x: number;
  y: number;
}

enum Orientation {
  Horizontal,
  Vertical,
  Diagonal,
}

interface Line {
  start: Coordinates;
  end: Coordinates;
  orientation: Orientation
}

const parseLine = (rawLine: string): Line => {
  const [start, end] = rawLine.split(' -> ');
  const [sx, sy] = start.split(',');
  const [ex, ey] = end.split(',');

  let orientation;
  if (sx === ex) {
    orientation = Orientation.Horizontal;
  } else if (sy === ey) {
    orientation = Orientation.Vertical;
  } else {
    orientation = Orientation.Diagonal;
  }

  return {
    start: {
      x: +sx,
      y: +sy,
    },
    end: {
      x: +ex,
      y: +ey,
    },
    orientation,
  };
}

const lines = data.map(parseLine);

type Grid = { [x: number]: { [y: number]: number }};

const grid: Grid = {};
const incrementGridItem = (x: number, y: number) => {
  if (!grid[x]) {
    grid[x] = {};
  }

  grid[x][y] = (grid[x][y] || 0) + 1;
}

const fillVertical = (line: Line) => {
  const start = Math.min(line.start.x, line.end.x);
  const end = Math.max(line.start.x, line.end.x);
  for (let i = start; i <= end; i++) {
    incrementGridItem(i, line.start.y);
  }
}

const fillHorizontal = (line: Line) => {
  const start = Math.min(line.start.y, line.end.y);
  const end = Math.max(line.start.y, line.end.y);
  for (let i = start; i <= end; i++) {
    incrementGridItem(line.start.x, i);
  }
}

lines.forEach((line) => {
  if (line.orientation === Orientation.Horizontal) {
    fillHorizontal(line);
  } else if (line.orientation === Orientation.Vertical) {
    fillVertical(line);
  }
});

// Logging
// for (let j = 0; j < 10; j++) {
//   let str = '';
//   for (let i = 0; i < 10; i++) {
//     str += `${(grid[i] && grid[i][j]) || '.'}`;
//   }
//   console.log(str);
// }

let total = 0;
Object.keys(grid).forEach((x) => {
  Object.keys(grid[+x]).forEach((y) => {
    if (grid[+x][+y] > 1) {
      total++;
    }
  })
})

console.log(total);