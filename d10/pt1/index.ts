import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let errorScore: { [key: string]: number } = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

let inverseSymbol: { [key: string]: string } = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

let sum = 0;
data.forEach((line, lineI) => {
  const parStack = [];
  const braStack = [];
  const curStack = [];
  const poiStack = [];
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    if (['(', '[', '{', '<'].includes(line[i])) {
      stack.push(line[i]);
    } else if (line[i] === inverseSymbol[stack[stack.length - 1]]) {
      stack.pop();
    } else {
      sum += errorScore[line[i]];
      break;
    }
  }
});

console.log(sum);