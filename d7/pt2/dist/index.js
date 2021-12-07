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
const data = rawData.split('\n')[0].split(',').map(n => +n);
const min = Math.min(...data);
const max = Math.max(...data);
let results = {};
for (let i = min; i < max; i++) {
    let total = 0;
    data.forEach((distance) => {
        let trueDist = Math.abs(distance - i);
        const fuelBurn = (trueDist * (trueDist + 1)) / 2;
        total += fuelBurn;
    });
    results[i] = total;
}
// console.log(results);
let smallest = Infinity;
Object.keys(results).forEach((pos) => {
    if (results[+pos] < smallest) {
        smallest = results[+pos];
    }
});
console.log(smallest);
//# sourceMappingURL=index.js.map