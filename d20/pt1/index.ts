import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

type Image = { [coord: string]: boolean };
const enhancement = data[0];
const image: Image = {};
const genKey = (x: number, y: number) => `${x}_${y}`;
const parseKey = (key: string) => key.split('_').map(n => +n);

for (let y = 2; y < data.length; y++) {
  const row = data[y];
  for (let x = 0; x < row.length; x++) {
    image[genKey(x, y - 2)] = data[y][x] === '#';
  }
}

const getEnhancedValue = (centerX: number, centerY: number, snapshot: Image): boolean => {
  let str = '';
  for (let y = centerY - 1; y <= centerY + 1; y++) {
    for (let x = centerX - 1; x <= centerX + 1; x++) {
      str += snapshot[genKey(x, y)] ? '1' : '0';
    }
  }

  const index = parseInt(str, 2);
  return enhancement[index] === '#';
}

const enhanceCount = 2;
const buffer = 10;

let minX = -enhanceCount - buffer;
let minY = -enhanceCount - buffer;
let maxX = data[3].length + enhanceCount + buffer;
let maxY = data[3].length + enhanceCount + buffer;
const enhance = () => {
  const snapshot = JSON.parse(JSON.stringify(image));
  for (let y = minY; y < maxY; y++) {
    for (let x = minX; x < maxX; x++) {
      if (x === maxX - 1 && y === maxY - 1) {
        console.log('end');
      }
      image[genKey(x, y)] = getEnhancedValue(x, y, snapshot);
    }
  }
}

const printImage = () => {
  console.log(''.padStart(Math.abs(minX) + Math.abs(maxX) + 2, '_'));
  for (let y = minY; y < maxY; y++) {
    let row = '|';
    for (let x = minX; x < maxX; x++) {
      row += image[genKey(x, y)] ? '█' : ' ';
    }
    row += '|';
    console.log(row);
  }
  console.log(''.padStart(Math.abs(minX) + Math.abs(maxX) + 2, '‾'));
}

const debug = true;
for (let i = 0; i < enhanceCount; i++) {
  enhance();
  debug && printImage();
}

let sum = 0;
Object.keys(image).forEach((key) => {
  const [x, y] = parseKey(key);
  if (x < minX + buffer
    || x > maxX - buffer
    || y < minY + buffer
    || y > maxY - buffer) {
    // do nothing;
  } else {
    if (image[key]) {
      sum++;
    }
  }
});
console.log(sum);