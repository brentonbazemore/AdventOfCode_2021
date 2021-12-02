import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let position = {
  horizontal: 0,
  depth: 0,
};

const move = {
  forward: (magnitude: number) => { position.horizontal += magnitude },
  down: (magnitude: number) => { position.depth += magnitude },
  up: (magnitude: number) => { position.depth -= magnitude },
};

data.forEach(rawMove => {
  const [action, magnitude] = rawMove.split(' ');
  move[action as 'forward' | 'down' | 'up'](+magnitude);
});

console.log(position.horizontal * position.depth);