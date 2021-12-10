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
let errorScore = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
};
let inverseSymbol = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<',
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
};
let sum = 0;
data.forEach((line, lineI) => {
    const parStack = [];
    const braStack = [];
    const curStack = [];
    const poiStack = [];
    const stack = [];
    for (let i = 0; i < line.length; i++) {
        if (['(', '[', '{', '<'].includes(line[i])) {
            stack.push(line[i]);
        }
        else if (line[i] === inverseSymbol[stack[stack.length - 1]]) {
            stack.pop();
        }
        else {
            sum += errorScore[line[i]];
            break;
        }
    }
});
console.log(sum);
//# sourceMappingURL=index.js.map