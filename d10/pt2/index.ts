import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let errorScore: { [key: string]: number } = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
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

const cleanLines = data.filter((line) => {
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    if (['(', '[', '{', '<'].includes(line[i])) {
      stack.push(line[i]);
    } else if (line[i] === inverseSymbol[stack[stack.length - 1]]) {
      stack.pop();
    } else {
      return false;
    }
  }

  return true;
});

let scores = cleanLines.map((line) => {
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    if (['(', '[', '{', '<'].includes(line[i])) {
      stack.push(line[i]);
    } else if (line[i] === inverseSymbol[stack[stack.length - 1]]) {
      stack.pop();
    } else {
      console.log('is this possible?');
      // turns out: no.
    }
  }

  const stackLength = stack.length;
  let score = 0;
  for (let i = 0; i < stackLength; i++) {
    score *= 5;
    score += errorScore[stack.pop()!];
  }

  return score;
});

scores = scores.sort((a, b) => a - b);

console.log(scores[Math.floor(scores.length / 2)])
