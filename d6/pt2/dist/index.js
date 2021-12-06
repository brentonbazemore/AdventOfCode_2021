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
console.time();
// Toggle this to switch input files
const testInput = false;
// #################################
const rawData = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data = rawData.split('\n')[0].split(',').map(n => +n);
class LanternFish {
    constructor(cycle, count) {
        this.timer = cycle;
        this.count = count;
    }
    tick() {
        let spawn = false;
        if (this.timer === 0) {
            // spawn new fish and add to list
            spawn = true;
            this.timer = 6;
        }
        else {
            this.timer--;
        }
        return spawn;
    }
}
// spawn initial fish
let fishFreq = {};
data.forEach((num) => {
    fishFreq[num] = (fishFreq[num] || 0) + 1;
});
const fishes = Object.keys(fishFreq).map((timer) => new LanternFish(+timer, fishFreq[+timer]));
console.log(fishes);
const DAYS = 256;
for (let i = 0; i < DAYS; i++) {
    let newFishCount = 0;
    fishes.forEach((fish) => {
        const spawnNewFish = fish.tick();
        if (spawnNewFish) {
            newFishCount += fish.count;
        }
    });
    fishes.push(new LanternFish(8, newFishCount));
}
let total = 0;
fishes.forEach(f => total += f.count);
console.log(total);
console.log(fishes.length);
console.timeEnd();
//# sourceMappingURL=index.js.map