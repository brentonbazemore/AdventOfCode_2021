import * as fs from 'fs';

const rawData: string = fs.readFileSync('input.txt', 'utf8');
const data: string[] = rawData.split('\n');

let total = 0;
for (let i = 1; i < data.length; i++) {
  const prevNum = +data[i - 1];
  const curNum = +data[i];

  total += +(curNum > prevNum);
}

console.log(total);