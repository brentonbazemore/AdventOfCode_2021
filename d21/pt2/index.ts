import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let [, p1Position] = data[0].split(': ').map(n => +n);
let [, p2Position] = data[1].split(': ').map(n => +n);

const wrap = (num: number) => {
  while (num > 10) {
    num -= 10;
  }

  return num;
}

const toKey = (p1p: number, p1s: number, p2p: number, p2s: number) => `${p1p}_${p1s}_${p2p}_${p2s}`;

const knownOutcomes: { [state: string]: { p1: number, p2: number } } = {};
const playRound = (p1Position: number, p1Score: number, p2Position: number, p2Score: number) => {
  const key = toKey(p1Position, p1Score, p2Position, p2Score);
  if (knownOutcomes[key]) {
    return knownOutcomes[key];
  }

  if (p1Score >= 21) {
    return { p1: 1, p2: 0 };
  }

  if (p2Score >= 21) {
    return { p1: 0, p2: 1 };
  }

  let wins: { p1: number, p2: number } = { p1: 0, p2: 0 };
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
          const newP1Position = wrap(p1Position + i + j + k);
          const newP1Score = p1Score + newP1Position;
          // flip to alternate turns
          const newCount = playRound(p2Position, p2Score, newP1Position, newP1Score);
          wins.p1 += newCount.p2;
          wins.p2 += newCount.p1;
      }
    }
  }

  knownOutcomes[key] = wins;

  return wins;
}

const out = playRound(p1Position, 0, p2Position, 0);
console.log(out);