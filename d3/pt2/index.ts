import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const buildFreqMap = (fullData: string[]) => {
  const freqMap: { [column: number]: number } = {};
  for (let i = 0; i < fullData.length; i++) {
    const row = fullData[i];
    for (let j = 0; j < row.length; j++) {
      freqMap[j] = (freqMap[j] || 0) + +row[j];
    }
  }

  const analyzedFreq: { [column: number]: number } = {};
  Object.keys(freqMap).forEach((column) => {
    if (freqMap[+column] >= (fullData.length / 2)) {
      analyzedFreq[+column] = 1;
    } else {
      analyzedFreq[+column] = 0;
    }
  });

  return analyzedFreq;
};

const freq = buildFreqMap(data);

const filtOxy = (dataSet: string[], freqs: { [column: number]: number }, column: number): string => {
  const filtered = dataSet.filter(row => +row[column] === freqs[column]);
  
  if (filtered.length > 1) {
    const newFreqs = buildFreqMap(filtered);
    return filtOxy(filtered, newFreqs, column + 1);
  } else {
    return filtered[0];
  }
}

const filtCo2 = (dataSet: string[], freqs: { [column: number]: number }, column: number): string => {
  const filtered = dataSet.filter(row => +row[column] !== freqs[column]);

  if (filtered.length > 1) {
    const newFreqs = buildFreqMap(filtered);
    return filtCo2(filtered, newFreqs, column + 1);
  } else {
    return filtered[0];
  }
}

const oxygenB = filtOxy(data, freq, 0);
const co2B = filtCo2(data, freq, 0);

const oxygenD = parseInt(oxygenB, 2);
const co2D = parseInt(co2B, 2);

console.log(oxygenB, co2B);
console.log(oxygenD, co2D);
console.log(oxygenD * co2D);
