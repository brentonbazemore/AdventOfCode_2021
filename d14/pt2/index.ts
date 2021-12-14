import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

const initTemplate = data[0];
const rules: { [pair: string]: string } = {};
for (let i = 2; i < data.length; i++) {
  const [pair, insert] = data[i].split(' -> ');
  rules[pair] = insert;
}

let template = initTemplate;
for (let step = 0; step < 10; step++) {
  let newTemplate = '';
  for (let i = 0; i < template.length - 1; i++) {
    let templatePair = template[i] + template[i+1];

    let newSequence;
    if (rules[templatePair]) {
      newSequence = template[i] + rules[templatePair];
    } else {
      console.log('hit?');
      newSequence = templatePair;
    }
  
    newTemplate += newSequence;
  }

  newTemplate += template[template.length - 1];

  template = newTemplate;
}

let freq: { [c: string]: number } = {};
template.split('').forEach((char) => {
  freq[char] = (freq[char] || 0) + 1
});

let min = { char: '', value: Infinity };
let max = { char: '', value: -Infinity };
Object.keys(freq).forEach((char) => {
  if (freq[char] > max.value) {
    max = { char, value: freq[char] };
  }

  if (freq[char] < min.value) {
    min = { char, value: freq[char] };
  }
});

console.log(max.value - min.value);

// console.log(template);