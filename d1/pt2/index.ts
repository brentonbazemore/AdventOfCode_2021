import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let total = 0;
let prevSum = -Infinity;
for (let i = 3; i < data.length; i++) {
  const prevPrevNum = +data[i - 2];
  const prevNum = +data[i - 1];
  const curNum = +data[i];

  const curSum = prevPrevNum + prevNum + curNum;

  total += +(curSum > prevSum);

  prevSum = curSum;
}

console.log(total);