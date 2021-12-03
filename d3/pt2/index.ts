import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const freqMap: { [column: number]: number } = {};
for (let i = 0; i < data.length; i++) {
  const row = data[i];
  for (let j = 0; j < row.length; j++) {
    freqMap[j] = (freqMap[j] || 0) + +row[j];
  }
}

let gamma = '';
let epsilon = '';
Object.keys(freqMap).forEach((column) => {
  if (freqMap[+column] > (data.length / 2)) {
    gamma += '1';
    epsilon += '0';
  } else {
    gamma += '0';
    epsilon += '1';
  }
});

const decGamma = parseInt(gamma, 2);
const decEpsilon = parseInt(epsilon, 2);

console.log(freqMap);
console.log({ gamma, epsilon });
console.log(decGamma * decEpsilon);