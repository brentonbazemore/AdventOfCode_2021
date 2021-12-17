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
const rawInput = data[0];
const [xRaw, yRaw] = rawInput.split(', ');
const [_, xNums] = xRaw.split('x=');
const [_2, yNums] = yRaw.split('y=');
const [x1, x2] = xNums.split('..').map(n => +n);
const [y1, y2] = yNums.split('..').map(n => +n);
// target area: x=20..30, y=-10..-5
const calculateXDecay = (x) => {
    if (x > 0) {
        return x - 1;
    }
    else if (x < 0) {
        return x + 1;
    }
    else {
        return 0;
    }
};
const calculateYDecay = (y) => {
    return y - 1;
};
const calcSteps = (xVelocity, yVelocity) => {
    let coords = { x: 0, y: 0 };
    let maxY = coords.y;
    while (true) {
        coords.x += xVelocity;
        coords.y += yVelocity;
        maxY = Math.max(maxY, coords.y);
        if (coords.x >= x2 + 1) {
            // console.log('overshot');
            return false;
        }
        if (coords.y < y1) {
            // console.log('too far down');
            return false;
        }
        if (coords.x >= x1 && coords.x <= x2
            && coords.y >= y1 && coords.y <= y2) {
            return true;
        }
        xVelocity = calculateXDecay(xVelocity);
        yVelocity = calculateYDecay(yVelocity);
    }
};
const findShortestX = (xVelocity) => {
    let coords = { x: 0, y: y1 };
    while (true) {
        coords.x += xVelocity;
        if (coords.x >= x2 + 1) {
            // console.log('overshot');
            return false;
        }
        if (xVelocity === 0) {
            // console.log('stopped');
            return false;
        }
        if (coords.x >= x1 && coords.x <= x2) {
            return true;
        }
        xVelocity = calculateXDecay(xVelocity);
    }
};
const Xes = [];
for (let i = 0; i <= x2 + 1; i++) {
    if (findShortestX(i)) {
        Xes.push(i);
    }
}
// console.log(Xes);
// based on shortest x, calculate highest y
const combos = [];
Xes.forEach((x) => {
    for (let i = -2000; i < 2000; i++) {
        if (calcSteps(x, i)) {
            combos.push(`${x}_${i}`);
        }
    }
});
console.log(combos.length);
// console.log(highestY);
//# sourceMappingURL=index.js.map