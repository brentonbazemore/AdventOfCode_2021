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
class Octopus {
    constructor(lightLevel) {
        this.lightLevel = lightLevel;
        this.turnLastFlashed = -1;
    }
    tryFlash(turn) {
        if (this.lightLevel > 9 && this.turnLastFlashed < turn) {
            this.turnLastFlashed = turn;
            return true;
        }
        return false;
    }
    flash() {
        this.lightLevel = 0;
    }
    tick() {
        this.lightLevel++;
    }
}
const WIDTH = data[0].length;
const HEIGHT = data.length;
const grid = {};
for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
        if (!grid[j]) {
            grid[j] = {};
        }
        grid[j][i] = new Octopus(+data[i][j]);
    }
}
const emitLight = (x, y, turn) => {
    let coords = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        // [x, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
    ];
    coords.forEach((coord) => {
        var _a, _b, _c, _d;
        (_b = (_a = grid[coord[0]]) === null || _a === void 0 ? void 0 : _a[coord[1]]) === null || _b === void 0 ? void 0 : _b.tick();
        if ((_d = (_c = grid[coord[0]]) === null || _c === void 0 ? void 0 : _c[coord[1]]) === null || _d === void 0 ? void 0 : _d.tryFlash(turn)) {
            emitLight(coord[0], coord[1], turn);
        }
    });
};
const simulate = (turn) => {
    let flashCount = 0;
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            grid[x][y].tick();
        }
    }
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            const didFlash = grid[x][y].tryFlash(turn);
            if (didFlash) {
                emitLight(x, y, turn);
            }
        }
    }
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            if (grid[x][y].turnLastFlashed === turn) {
                grid[x][y].flash();
                flashCount++;
            }
        }
    }
    return flashCount;
};
const TURN_COUNT = 100;
let sum = 0;
for (let t = 0; t < TURN_COUNT; t++) {
    sum += simulate(t);
}
console.log(sum);
// Logging
// for (let j = 0; j < 10; j++) {
//   let str = '';
//   for (let i = 0; i < 10; i++) {
//     str += `${(grid[i] && grid[i][j]).lightLevel}`;
//   }
//   console.log(str);
// }
// console.log(grid);
//# sourceMappingURL=index.js.map