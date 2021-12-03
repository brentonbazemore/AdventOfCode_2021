"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// Toggle this to switch input files
const testInput = false;
// #################################
const rawData = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data = rawData.split('\n');
const buildFreqMap = (fullData) => {
    const freqMap = {};
    for (let i = 0; i < fullData.length; i++) {
        const row = fullData[i];
        for (let j = 0; j < row.length; j++) {
            freqMap[j] = (freqMap[j] || 0) + +row[j];
        }
    }
    const analyzedFreq = {};
    Object.keys(freqMap).forEach((column) => {
        if (freqMap[+column] >= (fullData.length / 2)) {
            analyzedFreq[+column] = 1;
        }
        else {
            analyzedFreq[+column] = 0;
        }
    });
    return analyzedFreq;
};
// const freqMap: { [column: number]: number } = {};
// for (let i = 0; i < data.length; i++) {
//   const row = data[i];
//   for (let j = 0; j < row.length; j++) {
//     freqMap[j] = (freqMap[j] || 0) + +row[j];
//   }
// }
// const analyzedFreq: { [column: number]: number } = {};
// Object.keys(freqMap).forEach((column) => {
//   if (freqMap[+column] >= (data.length / 2)) {
//     analyzedFreq[+column] = 1;
//   } else {
//     analyzedFreq[+column] = 0;
//   }
// });
const freq = buildFreqMap(data);
console.log(freq);
// console.log(freqMap);
// console.log(analyzedFreq);
const filtOxy = (dataSet, freqs, column) => {
    const filtered = dataSet.filter(row => +row[column] === freqs[column]);
    if (filtered.length > 1) {
        const newFreqs = buildFreqMap(filtered);
        return filtOxy(filtered, newFreqs, column + 1);
    }
    else {
        return filtered[0];
    }
};
const filtCo2 = (dataSet, freqs, column) => {
    const filtered = dataSet.filter(row => +row[column] !== freqs[column]);
    if (filtered.length > 1) {
        const newFreqs = buildFreqMap(filtered);
        return filtCo2(filtered, newFreqs, column + 1);
    }
    else {
        return filtered[0];
    }
};
const oxygenB = filtOxy(data, freq, 0);
const co2B = filtCo2(data, freq, 0);
const oxygenD = parseInt(oxygenB, 2);
const co2D = parseInt(co2B, 2);
console.log(oxygenB, co2B);
console.log(oxygenD, co2D);
console.log(oxygenD * co2D);
// const f1 = data.filter((row) => +row[0] === analyzedFreq[0]);
// const f2 = f1.filter((row) => +row[1] === analyzedFreq[1]);
// const f3 = f2.filter((row) => +row[2] === analyzedFreq[2]);
// const f4 = f3.filter((row) => +row[3] === analyzedFreq[3]);
// console.log(f4);
//# sourceMappingURL=index.js.map