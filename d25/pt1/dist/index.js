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
const HEIGHT = data.length;
const WIDTH = data[0].length;
let cucumberGrid = {};
for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
        if (!cucumberGrid[x]) {
            cucumberGrid[x] = {};
        }
        cucumberGrid[x][y] = data[y][x];
    }
}
const moveEast = () => {
    let newGrid = JSON.parse(JSON.stringify(cucumberGrid));
    let diff = 0;
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            const nextX = (x + 1) % WIDTH;
            if (cucumberGrid[x][y] === '>' && cucumberGrid[nextX][y] === '.') {
                // then move it
                newGrid[x][y] = '.';
                newGrid[nextX][y] = '>';
                diff++;
            }
            else {
                // leave it
            }
        }
    }
    cucumberGrid = newGrid;
    return diff;
};
const moveDown = () => {
    let newGrid = JSON.parse(JSON.stringify(cucumberGrid));
    let diff = 0;
    for (let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++) {
            const nextY = (y + 1) % HEIGHT;
            if (cucumberGrid[x][y] === 'v' && cucumberGrid[x][nextY] === '.') {
                // then move it
                diff++;
                newGrid[x][y] = '.';
                newGrid[x][nextY] = 'v';
            }
            else {
                // leave it
            }
        }
    }
    cucumberGrid = newGrid;
    return diff;
};
const logGrid = () => {
    for (let y = 0; y < HEIGHT; y++) {
        let line = '';
        for (let x = 0; x < WIDTH; x++) {
            line += cucumberGrid[x][y];
        }
        console.log(line);
    }
};
let i = 0;
while (true) {
    let diff = 0;
    diff += moveEast();
    diff += moveDown();
    if (diff === 0) {
        break;
    }
    i++;
}
logGrid();
console.log(i + 1, 'steps');
//# sourceMappingURL=index.js.map