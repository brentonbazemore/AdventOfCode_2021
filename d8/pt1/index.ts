import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

interface Signal {
  patterns: string[];
  digits: string[];
}

const signals = data.map((line): Signal => {
  const [patternString, digitString] = line.split(' | ');
  const patterns = patternString.split(' ');
  const digits = digitString.split(' ');

  return {
    patterns,
    digits,
  };
});

let total = 0;
signals.forEach((signal) => {
  // console.log(signal.digits);
  signal.digits.forEach((digit) => {
    // console.log(digit.length);
    // 1 4 7 8
    if (digit.length === 2 || digit.length === 4 || digit.length === 3 || digit.length === 7) {
      total++;
    }
  });
});

console.log(total);