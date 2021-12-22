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
const wrap = (num) => {
    while (num > 10) {
        num -= 10;
    }
    return num;
};
const toKey = (p1p, p1s, p2p, p2s) => `${p1p}_${p1s}_${p2p}_${p2s}`;
const knownOutcomes = {};
const playRound = (p1Position, p1Score, p2Position, p2Score) => {
    const key = toKey(p1Position, p1Score, p2Position, p2Score);
    if (knownOutcomes[key]) {
        return knownOutcomes[key];
    }
    if (p1Score >= 21) {
        return { p1: 1, p2: 0 };
    }
    if (p2Score >= 21) {
        return { p1: 0, p2: 1 };
    }
    let wins = { p1: 0, p2: 0 };
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            for (let k = 1; k <= 3; k++) {
                const newP1Position = wrap(p1Position + i + j + k);
                const newP1Score = p1Score + newP1Position;
                // flip to alternate turns
                const newCount = playRound(p2Position, p2Score, newP1Position, newP1Score);
                wins.p1 += newCount.p2;
                wins.p2 += newCount.p1;
            }
        }
    }
    knownOutcomes[key] = wins;
    return wins;
};
const out = playRound(p1Position, 0, p2Position, 0);
console.log(out);
//# sourceMappingURL=index.js.map