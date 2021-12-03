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
const freqMap = {};
for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
        freqMap[j] = (freqMap[j] || 0) + +row[j];
    }
}
let gamma = '';
let epsilon = '';
Object.keys(freqMap).forEach((column) => {
    if (freqMap[+column] > (data.length / 2)) {
        gamma += '1';
        epsilon += '0';
    }
    else {
        gamma += '0';
        epsilon += '1';
    }
});
const decGamma = parseInt(gamma, 2);
const decEpsilon = parseInt(epsilon, 2);
console.log(freqMap);
console.log({ gamma, epsilon });
console.log(decGamma * decEpsilon);
//# sourceMappingURL=index.js.map