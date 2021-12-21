import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let [, p1Position] = data[0].split(': ').map(n => +n);
let [, p2Position] = data[1].split(': ').map(n => +n);

let p1Score = 0;
let p2Score = 0;

const wrap = (num: number) => {
  while (num > 10) {
    num -= 10;
  }

  return num;
}

let rollCount = 0;
let die = 100;
const getDieValue = () => {
  die++;
  if (die > 100) {
    die -= 100;
  }
  rollCount++;

  return die;
};

let isP1Turn = false;
while (p1Score < 1000 && p2Score < 1000) {
  isP1Turn = !isP1Turn;

  let dist = 0;
  for (let i = 0; i < 3; i++) {
    dist += getDieValue();
  }

  if (isP1Turn) {
    p1Position = wrap(p1Position + dist);
    p1Score += p1Position
  } else {
    p2Position = wrap(p2Position + dist);
    p2Score += p2Position;
  }
}

console.log({ p1Score, p2Score, p1Position, p2Position, rollCount });

if (p1Score > p2Score) {
  console.log(rollCount * p2Score);
} else {
  console.log(rollCount * p1Score);
}