import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');
const rawInput = data[0];
const [xRaw, yRaw] = rawInput.split(', ');
const [_, xNums] = xRaw.split('x=');
const [_2, yNums] = yRaw.split('y=');
const [x1, x2] = xNums.split('..').map(n => +n);
const [y1, y2] = yNums.split('..').map(n => +n);

// target area: x=20..30, y=-10..-5

const calculateXDecay = (x: number) => {
  if (x > 0) {
    return x - 1;
  } else if (x < 0) {
    return x + 1;
  } else {
    return 0;
  }
}

const calculateYDecay = (y: number) => {
  return y - 1;
}

const calcSteps = (xVelocity: number, yVelocity: number) => {
  let coords = { x: 0, y: 0 };
  let maxY = coords.y;
  while (true) {
    coords.x += xVelocity;
    coords.y += yVelocity;
    maxY = Math.max(maxY, coords.y);

    if (coords.x >= x2 + 1) {
      // console.log('overshot');
      return false;
    }

    if (coords.y < y1) {
      // console.log('too far down');
      return false;
    }

    if (coords.x >= x1 && coords.x <= x2
      && coords.y >= y1 && coords.y <= y2) 
    {
      return true;
    }

    xVelocity = calculateXDecay(xVelocity);
    yVelocity = calculateYDecay(yVelocity);
  }
}

const findShortestX = (xVelocity: number) => {
  let coords = { x: 0, y: y1 };
  while (true) {
    coords.x += xVelocity;

    if (coords.x >= x2 + 1) {
      // console.log('overshot');
      return false;
    }

    if (xVelocity === 0) {
      // console.log('stopped');
      return false;
    }

    if (coords.x >= x1 && coords.x <= x2) {
      return true;
    }

    xVelocity = calculateXDecay(xVelocity);
  }
}

const Xes: number[] = [];
for (let i = 0; i <= x2 + 1; i++) {
  if (findShortestX(i)) {
    Xes.push(i);
  }
}

// based on shortest x, calculate highest y
const combos: string[] = [];

Xes.forEach((x) => {
  for (let i = -2000; i < 2000; i++) {
    if (calcSteps(x, i)) {
      combos.push(`${x}_${i}`);
    }
  }
});

console.log(combos.length)
