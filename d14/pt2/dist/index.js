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
const initTemplate = data[0];
const rules = {};
const chunks = {};
for (let i = 2; i < data.length; i++) {
    const [pair, insert] = data[i].split(' -> ');
    const [char1, char2] = pair.split('');
    rules[pair] = insert;
    chunks[pair] = char1 + insert + char2;
    console.log(pair, '=', char1 + insert, insert + char2);
}
let pairFreq = {};
for (let pairSet = 0; pairSet < initTemplate.length - 1; pairSet++) {
    let pair = initTemplate.substr(pairSet, 2);
    pairFreq[pair] = (pairFreq[pair] || 0) + 1;
}
// pairFreq {
//   CH: 7,
//   CB: 2,
//   BH: 3,
// }
// 7CB + 2CB
// 7BH + 3BH
for (let step = 0; step < 40; step++) {
    console.log(step);
    let newFreqs = {};
    Object.keys(pairFreq).forEach((pair) => {
        const count = pairFreq[pair];
        const insert = rules[pair];
        const [char1, char2] = pair.split('');
        const pair1 = char1 + insert;
        const pair2 = insert + char2;
        newFreqs[pair1] = count + (newFreqs[pair1] || 0);
        newFreqs[pair2] = count + (newFreqs[pair2] || 0);
    });
    pairFreq = newFreqs;
}
// const knownOutcomes: { [str: string]: string } = {};
// const findOutcome = (substr: string): string => {
//   if (knownOutcomes[substr]) {
//     return knownOutcomes[substr];
//   } else {
//     const halfway = substr.length / 2;
//     const first = substr.substring(0, halfway);
//     const second = substr.substring(halfway);
//     let result1 = '';
//     let result2 = '';
//     if (first.length === 1) {
//       result1 = first;
//     } else if (first.length === 2) {
//       result1 = chunks[first];
//     } else {
//       result1 = findOutcome(first);
//     }
//     if (second.length === 1) {
//       result2 = second;
//     } else if (second.length === 2) {
//       result2 = chunks[second];
//     } else {
//       result2 = findOutcome(second);
//     }
//     knownOutcomes[first] = result1;
//     knownOutcomes[second] = result2;
//     const innerPair = result1[result1.length - 1] + result2[0];
//     let out = '';
//     try {
//       out = result1 + rules[innerPair] + result2;
//     } catch (e) {
//       console.log(result1.length + 1 + result2.length);
//       console.log(e);
//       throw e;
//     }
//     return out;
//   }
// }
// const splitSection = (whole: string) => {
//   const halfway = whole.length / 2;
//   const first = whole.substring(0, halfway);
//   const second = whole.substring(halfway);
//   return [first, second];
// }
// let sections = [];
// for (let pair = 0; pair < initTemplate.length - 1; pair++) {
//   sections[pair] = initTemplate.substr(pair, 2);
// }
// for (let step = 0; step < 40; step++) {
//   console.log(step);
//   const newSections = [];
//   for (let i = 0; i < sections.length; i++) {
//     const section = sections[i];
//     const newSection = findOutcome(section);
//     if (newSection.length > 2**25) {
//       // TODO: break into more sections here
//       newSections.push(...splitSection(newSection));
//     } else {
//       newSections.push(newSection);
//     }
//   }
//   sections = newSections;
// }
// console.log(sections);
// for (let i = 0; i < sections.length; i++) {
//   for (let step = 0; step < 10; step++) {
//     let section = sections[i];
//     console.log(step, section.length);
//     let newSection = '';
//     newSection = findOutcome(section);
//     // for (let j = 0; j < section.length - 1; j++) {
//     //   newSection += section[j] + rules[section.substr(j, 2)];
//     // }
//     // newSection += section[section.length - 1];
//     sections[i] = newSection;
//   }
// }
// let polymerSplits: string[] = splitPolymer(initTemplate);
// // let template = initTemplate;
// for (let step = 0; step < 10; step++) {
//   console.log(step);
//   for (let split = 0; split < polymerSplits.length; split++) {
//     polymerSplits[split] = findOutcome(polymerSplits[split]);
//   }
//   // const newTemplate = findOutcome(template);
//   // template = newTemplate;
//   // console.log(template);
// }
// const template = sections.map((s, i) => s.substring(i === 0 ? 0 : 1)).join('');
let freq = {};
// template.split('').forEach((char) => {
//   freq[char] = (freq[char] || 0) + 1
// });
Object.keys(pairFreq).forEach((pair) => {
    const [char1, char2] = pair.split('');
    freq[char1] = (freq[char1] || 0) + pairFreq[pair];
    freq[char2] = (freq[char2] || 0) + pairFreq[pair];
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
console.log((max.value - min.value) / 2);
// console.log(template);
//# sourceMappingURL=index.js.map