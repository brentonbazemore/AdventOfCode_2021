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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// Toggle this to switch input files
const testInput = false;
// #################################
const rawData = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data = rawData.split('\n');
const dimensions = { x: 1, y: 1 };
const initGrid = {};
const instructions = [];
data.forEach(line => {
    if (line.includes(',')) {
        const [x, y] = line.split(',');
        if (!initGrid[+x]) {
            initGrid[+x] = {};
        }
        initGrid[+x][+y] = true;
        dimensions.x = Math.max(dimensions.x, +x);
        dimensions.y = Math.max(dimensions.y, +y);
    }
    else if (line.includes('fold')) {
        const [variable, value] = line.split('fold along ')[1].split('=');
        instructions.push({ variable, value: +value });
    }
});
const foldY = (position, grid) => {
    var _a, _b;
    let newGrid = {};
    for (let y = 0; y < position; y++) {
        for (let x = 0; x <= dimensions.x; x++) {
            if ((_a = grid[x]) === null || _a === void 0 ? void 0 : _a[y]) {
                if (!newGrid[x]) {
                    newGrid[x] = {};
                }
                newGrid[x][y] = true;
            }
        }
    }
    let dist = 0;
    for (let y = position; y <= dimensions.y; y++) {
        for (let x = 0; x <= dimensions.x; x++) {
            if ((_b = grid[x]) === null || _b === void 0 ? void 0 : _b[y]) {
                if (!newGrid[x]) {
                    newGrid[x] = {};
                }
                newGrid[x][position - dist] = true;
            }
        }
        dist++;
    }
    return newGrid;
};
const foldX = (position, grid) => {
    var _a, _b;
    let newGrid = {};
    for (let y = 0; y <= dimensions.y; y++) {
        for (let x = 0; x < position; x++) {
            if ((_a = grid[x]) === null || _a === void 0 ? void 0 : _a[y]) {
                if (!newGrid[x]) {
                    newGrid[x] = {};
                }
                newGrid[x][y] = true;
            }
        }
    }
    for (let y = 0; y <= dimensions.y; y++) {
        let dist = 0;
        for (let x = position; x <= dimensions.x; x++) {
            if ((_b = grid[x]) === null || _b === void 0 ? void 0 : _b[y]) {
                let newX = position - dist;
                if (!newGrid[position - dist]) {
                    newGrid[position - dist] = {};
                }
                newGrid[position - dist][y] = true;
            }
            dist++;
        }
    }
    return newGrid;
};
let latestGrid = initGrid;
try {
    instructions.forEach((inst) => {
        if (inst.variable === 'x') {
            latestGrid = foldX(inst.value, latestGrid);
        }
        else {
            latestGrid = foldY(inst.value, latestGrid);
        }
        throw new Error('finished pt1');
    });
}
catch (e) {
}
// const g = foldY(instructions[0].value, initGrid);
// const g2 = foldX(instructions[1].value, g);
let sum = 0;
for (let y = 0; y <= dimensions.y; y++) {
    for (let x = 0; x <= dimensions.x; x++) {
        if ((_a = latestGrid[x]) === null || _a === void 0 ? void 0 : _a[y]) {
            sum++;
        }
    }
}
// for (let y = 0; y <= dimensions.y; y++) {
//   let str = '';
//   for (let x = 0; x <= dimensions.x; x++) {
//     str += latestGrid[x]?.[y] ? '#' : '.';
//   }
//   console.log(str);
// }
// console.log(grid);
// console.log(instructions);
console.log(sum);
//# sourceMappingURL=index.js.map