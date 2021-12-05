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
var Orientation;
(function (Orientation) {
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
    Orientation[Orientation["Diagonal"] = 2] = "Diagonal";
})(Orientation || (Orientation = {}));
const parseLine = (rawLine) => {
    const [start, end] = rawLine.split(' -> ');
    const [sx, sy] = start.split(',');
    const [ex, ey] = end.split(',');
    let orientation;
    if (sx === ex) {
        orientation = Orientation.Horizontal;
    }
    else if (sy === ey) {
        orientation = Orientation.Vertical;
    }
    else {
        orientation = Orientation.Diagonal;
    }
    return {
        start: {
            x: +sx,
            y: +sy,
        },
        end: {
            x: +ex,
            y: +ey,
        },
        orientation,
    };
};
const lines = data.map(parseLine);
const grid = {};
const incrementGridItem = (x, y) => {
    if (!grid[x]) {
        grid[x] = {};
    }
    grid[x][y] = (grid[x][y] || 0) + 1;
};
const fillVertical = (line) => {
    const start = Math.min(line.start.x, line.end.x);
    const end = Math.max(line.start.x, line.end.x);
    for (let i = start; i <= end; i++) {
        incrementGridItem(i, line.start.y);
    }
};
const fillHorizontal = (line) => {
    const start = Math.min(line.start.y, line.end.y);
    const end = Math.max(line.start.y, line.end.y);
    for (let i = start; i <= end; i++) {
        incrementGridItem(line.start.x, i);
    }
};
const fillDiagonal = (line) => {
    let steps = Math.abs(line.start.x - line.end.x);
    let changeX;
    if (line.start.x > line.end.x) {
        changeX = (num) => num - 1;
    }
    else {
        changeX = (num) => num + 1;
    }
    let changeY;
    if (line.start.y > line.end.y) {
        changeY = (num) => num - 1;
    }
    else {
        changeY = (num) => num + 1;
    }
    // this is bad but yolo
    for (let i = { x: line.start.x, y: line.start.y, step: 0 }; i.step <= steps; i = { x: changeX(i.x), y: changeY(i.y), step: i.step + 1 }) {
        incrementGridItem(i.x, i.y);
    }
};
lines.forEach((line) => {
    if (line.orientation === Orientation.Horizontal) {
        fillHorizontal(line);
    }
    else if (line.orientation === Orientation.Vertical) {
        fillVertical(line);
    }
    else if (line.orientation === Orientation.Diagonal) {
        fillDiagonal(line);
    }
});
// Logging
// for (let j = 0; j < 10; j++) {
//   let str = '';
//   for (let i = 0; i < 10; i++) {
//     str += `${(grid[i] && grid[i][j]) || '.'}`;
//   }
//   console.log(str);
// }
let total = 0;
Object.keys(grid).forEach((x) => {
    Object.keys(grid[+x]).forEach((y) => {
        if (grid[+x][+y] > 1) {
            total++;
        }
    });
});
console.log(total);
//# sourceMappingURL=index.js.map