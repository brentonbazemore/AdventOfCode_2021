import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

type Range = [number, number];
interface Instruction {
  toggle: 'on' | 'off';
  x: Range;
  y: Range;
  z: Range;
}

const instructions: Instruction[] = data.map((row => {
  const [dir, rest] = row.split(' ');
  const [rawX, rawY, rawZ] = rest.split(',');
  const [x1, x2] = rawX.split('..').map(s => s.replace('x=', '')).map(n => +n);
  const [y1, y2] = rawY.split('..').map(s => s.replace('y=', '')).map(n => +n);
  const [z1, z2] = rawZ.split('..').map(s => s.replace('z=', '')).map(n => +n);

  return {
    toggle: dir as 'on' | 'off',
    x: [x1, x2],
    y: [y1, y2],
    z: [z1, z2],
  };
}));

const toKey = (x: number, y: number, z: number) => `${x}_${y}_${z}`;

const cubes: { [coords: string]: boolean } = {};

instructions.forEach((instruction) => {
  if (instruction.x[0] < -50 || instruction.x[1] > 50) {
    return;
  }

  for (let x = instruction.x[0]; x <= instruction.x[1]; x++) {
    for (let y = instruction.y[0]; y <= instruction.y[1]; y++) {
      for (let z = instruction.z[0]; z <= instruction.z[1]; z++) {
        cubes[toKey(x, y, z)] = instruction.toggle === 'on';
      }
    }
  }
});

let sum = 0;
Object.values(cubes).forEach((cube) => {
  sum += +cube;
})

console.log(sum);