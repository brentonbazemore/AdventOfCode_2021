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
const enhancement = data[0];
const image = {};
const genKey = (x, y) => `${x}_${y}`;
const parseKey = (key) => key.split('_').map(n => +n);
for (let y = 2; y < data.length; y++) {
    const row = data[y];
    for (let x = 0; x < row.length; x++) {
        image[genKey(x, y - 2)] = data[y][x] === '#';
    }
}
const getEnhancedValue = (centerX, centerY, snapshot) => {
    let str = '';
    for (let y = centerY - 1; y <= centerY + 1; y++) {
        for (let x = centerX - 1; x <= centerX + 1; x++) {
            str += snapshot[genKey(x, y)] ? '1' : '0';
        }
    }
    const index = parseInt(str, 2);
    return enhancement[index] === '#';
};
const enhanceCount = 2;
const buffer = 10;
let minX = -enhanceCount - buffer;
let minY = -enhanceCount - buffer;
let maxX = data[3].length + enhanceCount + buffer;
let maxY = data[3].length + enhanceCount + buffer;
const enhance = () => {
    const snapshot = JSON.parse(JSON.stringify(image));
    for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
            if (x === maxX - 1 && y === maxY - 1) {
                console.log('end');
            }
            image[genKey(x, y)] = getEnhancedValue(x, y, snapshot);
        }
    }
};
const printImage = () => {
    console.log(''.padStart(Math.abs(minX) + Math.abs(maxX) + 2, '_'));
    for (let y = minY; y < maxY; y++) {
        let row = '|';
        for (let x = minX; x < maxX; x++) {
            row += image[genKey(x, y)] ? '█' : ' ';
        }
        row += '|';
        console.log(row);
    }
    console.log(''.padStart(Math.abs(minX) + Math.abs(maxX) + 2, '‾'));
};
const debug = true;
for (let i = 0; i < enhanceCount; i++) {
    enhance();
    debug && printImage();
}
let sum = 0;
Object.keys(image).forEach((key) => {
    const [x, y] = parseKey(key);
    if (x < minX + buffer
        || x > maxX - buffer
        || y < minY + buffer
        || y > maxY - buffer) {
        // do nothing;
    }
    else {
        if (image[key]) {
            sum++;
        }
    }
});
console.log(sum);
//# sourceMappingURL=index.js.map