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
const WIDTH = data[0].length;
const HEIGHT = data.length;
const safeAdd = (grid, x, y, value) => {
    if (!grid[x]) {
        grid[x] = {};
    }
    grid[x][y] = value;
};
const heightMap = {};
for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
        const cell = +row[j];
        safeAdd(heightMap, j, i, cell);
    }
}
const checkHeight = (grid, x, y) => {
    var _a, _b, _c, _d;
    const surrounding = [(_a = grid[x]) === null || _a === void 0 ? void 0 : _a[y + 1], (_b = grid[x + 1]) === null || _b === void 0 ? void 0 : _b[y], (_c = grid[x]) === null || _c === void 0 ? void 0 : _c[y - 1], (_d = grid[x - 1]) === null || _d === void 0 ? void 0 : _d[y]].filter((v) => v !== undefined);
    const value = grid[x][y];
    return value < Math.min(...surrounding);
};
let sum = 0;
for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
        if (checkHeight(heightMap, x, y)) {
            sum += (heightMap[x][y] + 1);
        }
    }
}
console.log(sum);
//# sourceMappingURL=index.js.map