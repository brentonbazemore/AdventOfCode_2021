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

class Cube {
  state: 'on' | 'off';
  start: {
    x: number;
    y: number;
    z: number;
  };
  end: {
    x: number;
    y: number;
    z: number;  
  };

  sizeX: number;
  sizeY: number;
  sizeZ: number;

  constructor(x1: number, x2: number, y1: number, y2: number, z1: number, z2: number, state: 'on' | 'off' = 'on') {
    this.start = {
      x: x1,
      y: y1,
      z: z1,
    };
    this.end = {
      x: x2,
      y: y2,
      z: z2,
    };
    this.sizeX = x2 - x1;
    this.sizeY = y2 - y1;
    this.sizeZ = z2 - z1;
    this.state = state as 'on' | 'off';
  }

  intersects(cube: Cube) {
    if ( this.start.x <= cube.end.x
      && this.end.x >= cube.start.x
      && this.start.y <= cube.end.y
      && this.end.y >= cube.start.y
      && this.start.z <= cube.end.z
      && this.end.z >= cube.start.z) {
      return true;
    }

    return false;
  }
};

const calculateIntersectionCube = (cube1: Cube, cube2: Cube) => {
  const xStart = Math.max(cube1.start.x, cube2.start.x);
  const xEnd = Math.min(cube1.end.x, cube2.end.x);
  const yStart = Math.max(cube1.start.y, cube2.start.y);
  const yEnd = Math.min(cube1.end.y, cube2.end.y);
  const zStart = Math.max(cube1.start.z, cube2.start.z);
  const zEnd = Math.min(cube1.end.z, cube2.end.z);

  return new Cube(xStart, xEnd, yStart, yEnd, zStart, zEnd, cube1.state === 'on' ? 'off' : 'on');
}

let litCubes: Cube[] = [];
instructions.forEach((instruction) => {
  const newCube = new Cube(instruction.x[0], instruction.x[1] + 1, instruction.y[0], instruction.y[1] + 1, instruction.z[0], instruction.z[1] + 1);
  const counterCubes: Cube[] = [];
  litCubes.forEach(cube => {
    if (newCube.intersects(cube)) {
      counterCubes.push(calculateIntersectionCube(cube, newCube));
    }
  });

  litCubes.push(...counterCubes);

  if (instruction.toggle === 'on') {
    litCubes.push(newCube);
  }
});

let sum = 0;
litCubes.forEach((cube) => {
  const volume = cube.sizeX * cube.sizeY * cube.sizeZ;
  if (cube.state === 'on') {
    sum += volume;
  } else {
    sum -= volume;
  }
});
console.log(sum);