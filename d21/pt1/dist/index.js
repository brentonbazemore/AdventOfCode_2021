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
let [, p1Position] = data[0].split(': ').map(n => +n);
let [, p2Position] = data[1].split(': ').map(n => +n);
let p1Score = 0;
let p2Score = 0;
// 10 + 18 = 28, 18
const wrap = (num) => {
    while (num > 10) {
        num -= 10;
    }
    return num;
};
let rollCount = 0;
let die = 100;
const getDieValue = () => {
    die++;
    if (die > 100) {
        die -= 100;
    }
    rollCount++;
    return die;
};
let isP1Turn = false;
while (p1Score < 1000 && p2Score < 1000) {
    isP1Turn = !isP1Turn;
    let dist = 0;
    for (let i = 0; i < 3; i++) {
        dist += getDieValue();
    }
    if (isP1Turn) {
        p1Position = wrap(p1Position + dist);
        p1Score += p1Position;
    }
    else {
        p2Position = wrap(p2Position + dist);
        p2Score += p2Position;
    }
}
console.log({ p1Score, p2Score, p1Position, p2Position, rollCount });
if (p1Score > p2Score) {
    console.log(rollCount * p2Score);
}
else {
    console.log(rollCount * p1Score);
}
//# sourceMappingURL=index.js.map