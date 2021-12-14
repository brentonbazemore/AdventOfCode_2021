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
for (let i = 2; i < data.length; i++) {
    const [pair, insert] = data[i].split(' -> ');
    rules[pair] = insert;
}
let template = initTemplate;
for (let step = 0; step < 40; step++) {
    console.log(step);
    let newTemplate = '';
    for (let i = 0; i < template.length - 1; i++) {
        let templatePair = template[i] + template[i + 1];
        let newSequence;
        if (rules[templatePair]) {
            newSequence = template[i] + rules[templatePair];
        }
        else {
            console.log('hit?');
            newSequence = templatePair;
        }
        newTemplate += newSequence;
    }
    newTemplate += template[template.length - 1];
    template = newTemplate;
}
let freq = {};
template.split('').forEach((char) => {
    freq[char] = (freq[char] || 0) + 1;
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
//# sourceMappingURL=index.js.map