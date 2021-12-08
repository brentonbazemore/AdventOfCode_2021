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
const signals = data.map((line) => {
    const [patternString, digitString] = line.split(' | ');
    const patterns = patternString.split(' ');
    const digits = digitString.split(' ');
    return {
        patterns,
        digits,
    };
});
let total = 0;
signals.forEach((signal) => {
    // console.log(signal.digits);
    signal.digits.forEach((digit) => {
        // console.log(digit.length);
        // 1 4 7 8
        if (digit.length === 2 || digit.length === 4 || digit.length === 3 || digit.length === 7) {
            total++;
        }
    });
});
console.log(total);
//# sourceMappingURL=index.js.map