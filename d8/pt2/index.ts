import * as fs from 'fs';
import * as _ from 'lodash';

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

const decode = (signal: Signal): number => {
  // i = represented digit
  const mappedDigits: string[] = [];

  mappedDigits[1] = signal.patterns.find((p) => p.length === 2)!;
  mappedDigits[4] = signal.patterns.find((p) => p.length === 4)!;
  mappedDigits[7] = signal.patterns.find((p) => p.length === 3)!;
  mappedDigits[8] = signal.patterns.find((p) => p.length === 7)!;

  // 0 = 6; 2 = 5; 3 = 5; 5 = 5; 6 = 6; 9 = 6;
  mappedDigits[5] = signal.patterns.filter(p => p.length === 5).find(p => {
    const tokensP = p.split('');
    const tokens7 = mappedDigits[7].split('');
    const tokens1 = mappedDigits[1].split('');
    const tokens4 = mappedDigits[4].split('');

    const temp1 = _.difference(tokensP, tokens7);
    const temp2 = _.difference(tokensP, tokens1);
    const temp3 = _.difference(tokensP, tokens4);

    if (temp1.length === 3 && temp2.length === 4 && temp3.length === 2) {
      return true;
    }

    return false;
  })!;

  mappedDigits[2] = signal.patterns.filter(p => p.length === 5).find(p => {
    const tokensP = p.split('');
    const tokens7 = mappedDigits[7].split('');
    const tokens1 = mappedDigits[1].split('');
    const tokens4 = mappedDigits[4].split('');
    const tokens5 = mappedDigits[5].split('');

    const temp1 = _.difference(tokensP, tokens7);
    const temp2 = _.difference(tokensP, tokens1);
    const temp3 = _.difference(tokensP, tokens4);
    const temp4 = _.difference(tokensP, tokens5);
    if (temp1.length === 3 && temp2.length === 4 && temp3.length === 3 && temp4.length === 2) {
      return true;
    }

    return false;
  })!;

  mappedDigits[3] = signal.patterns.filter(p => p.length === 5).find(p => p !== mappedDigits[2] && p !== mappedDigits[5])!;

  mappedDigits[6] = signal.patterns.filter(p => p.length === 6).find(p => {
    const tokensP = p.split('');
    const tokens7 = mappedDigits[7].split('');
    const tokens1 = mappedDigits[1].split('');
    const tokens2 = mappedDigits[2].split('');

    const temp1 = _.difference(tokensP, tokens7);
    const temp2 = _.difference(tokensP, tokens1);
    const temp3 = _.difference(tokensP, tokens2);

    if (temp1.length === 4 && temp2.length === 5 && temp3.length === 2) {
      return true;
    }

    return false;
  })!;

  mappedDigits[9] = signal.patterns.filter(p => p.length === 6).find(p => {
    const tokensP = p.split('');
    const tokens7 = mappedDigits[7].split('');
    const tokens1 = mappedDigits[1].split('');
    const tokens6 = mappedDigits[6].split('');
    const tokens5 = mappedDigits[5].split('');

    const temp1 = _.difference(tokensP, tokens7);
    const temp2 = _.difference(tokensP, tokens1);
    const temp3 = _.difference(tokensP, tokens6);
    const temp4 = _.difference(tokensP, tokens5);

    if (temp1.length === 3 && temp2.length === 4 && temp3.length === 1 && temp4.length === 1) {
      return true;
    }

    return false;
  })!;

  mappedDigits[0] = signal.patterns.filter(p => p.length === 6).find(p => p !== mappedDigits[6] && p !== mappedDigits[9])!;

  // console.log(mappedDigits);

  let numStr = '';
  signal.digits.forEach((digit) => {
    numStr += mappedDigits.findIndex(d => _.isEqual(d.split('').sort(), digit.split('').sort()));
  });

  return +numStr;
};

let total = 0;
signals.forEach(signal => {
  total += decode(signal);
});

console.log(total);