import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

type Grid = { [x: number]: { [y: number]: boolean }};
type Instruction = { variable: string, value: number };

const dimensions = { x: 1, y: 1 };
const initGrid: Grid = {};
const instructions: Instruction[] = []; 
data.forEach(line => {
  if (line.includes(',')) {
    const [x, y] = line.split(',');
    if (!initGrid[+x]) {
      initGrid[+x] = {};
    }

    initGrid[+x][+y] = true;
    dimensions.x = Math.max(dimensions.x, +x);
    dimensions.y = Math.max(dimensions.y, +y);
  } else if (line.includes('fold')) {
    const [variable, value] = line.split('fold along ')[1].split('=');
    instructions.push({ variable, value: +value });
  }
});

const foldY = (position: number, grid: Grid) => {
  let newGrid: Grid = {};
  for (let y = 0; y < position; y++) {
    for (let x = 0; x <= dimensions.x; x++) {
      if (grid[x]?.[y]) {
        if (!newGrid[x]) {
          newGrid[x] = {};
        }
        newGrid[x][y] = true;
      }
    }
  }

  let dist = 0;
  for (let y = position; y <= dimensions.y; y++) {
    for (let x = 0; x <= dimensions.x; x++) {
      if (grid[x]?.[y]) {
        if (!newGrid[x]) {
          newGrid[x] = {};
        }

        newGrid[x][position - dist] = true;
      }
    }

    dist++;
  }

  return newGrid;
};

const foldX = (position: number, grid: Grid) => {
  let newGrid: Grid = {};
  for (let y = 0; y <= dimensions.y; y++) {
    for (let x = 0; x < position; x++) {
      if (grid[x]?.[y]) {
        if (!newGrid[x]) {
          newGrid[x] = {};
        }
        newGrid[x][y] = true;
      }
    }
  }

  for (let y = 0; y <= dimensions.y; y++) {
    let dist = 0;
    for (let x = position; x <= dimensions.x; x++) {
      if (grid[x]?.[y]) {
        let newX = position - dist;
        if (!newGrid[position - dist]) {
          newGrid[position - dist] = {};
        }

        newGrid[position - dist][y] = true;
      }
      dist++;
    }

  }

  return newGrid;
}

let latestGrid = initGrid;
try {
  instructions.forEach((inst) => {
    if (inst.variable === 'x') {
      latestGrid = foldX(inst.value, latestGrid);
    } else {
      latestGrid = foldY(inst.value, latestGrid);
    }
  
    throw new Error('finished pt1');
  });
} catch (e) {

}

// const g = foldY(instructions[0].value, initGrid);
// const g2 = foldX(instructions[1].value, g);

let sum = 0;
for (let y = 0; y <= dimensions.y; y++) {
  for (let x = 0; x <= dimensions.x; x++) {
    if (latestGrid[x]?.[y]) {
      sum++;
    }
  }
}
// for (let y = 0; y <= dimensions.y; y++) {
//   let str = '';
//   for (let x = 0; x <= dimensions.x; x++) {
//     str += latestGrid[x]?.[y] ? '#' : '.';
//   }
//   console.log(str);
// }

// console.log(grid);
// console.log(instructions);
console.log(sum);