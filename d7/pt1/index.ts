import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: number[] = rawData.split('\n')[0].split(',').map(n => +n);

const min = Math.min(...data);
const max = Math.max(...data);

let results: { [i: number]: number } = {};
for (let i = min; i < max; i++) {
  console.log(i);
  let total = 0;
  data.forEach((distance) => {
    total += Math.abs(distance - i);
  });
  results[i] = total;
}

let smallest = Infinity;
Object.keys(results).forEach((pos) => {
  if (results[+pos] < smallest) {
    smallest = results[+pos]; 
  }
});

console.log(smallest);