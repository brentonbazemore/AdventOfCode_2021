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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const node_dijkstra_1 = __importDefault(require("node-dijkstra"));
// Toggle this to switch input files
const testInput = false;
// #################################
const rawData = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data = rawData.split('\n');
const genKey = (x, y) => `${x}_${y}`;
const TRUE_WIDTH = data[0].length;
const TRUE_HEIGHT = data.length;
const getPoint = (x, y) => {
    const xOffset = Math.floor(x / TRUE_WIDTH);
    const yOffset = Math.floor(y / TRUE_HEIGHT);
    const value = +data[y % TRUE_HEIGHT][x % TRUE_WIDTH] + xOffset + yOffset;
    return value > 9 ? value - 9 : value;
};
const fullMap = {};
const WIDTH = TRUE_WIDTH * 5;
const HEIGHT = TRUE_HEIGHT * 5;
for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
        if (!fullMap[x]) {
            fullMap[x] = {};
        }
        fullMap[x][y] = getPoint(x, y);
    }
}
const route = new node_dijkstra_1.default();
for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
        const neighbors = [
            [x, y + 1],
            [x + 1, y],
            [x, y - 1],
            [x - 1, y]
        ];
        const adj = {};
        neighbors.forEach(([nx, ny]) => {
            var _a;
            if (((_a = fullMap[nx]) === null || _a === void 0 ? void 0 : _a[ny]) != null) {
                adj[genKey(nx, ny)] = +fullMap[nx][ny];
            }
        });
        route.addNode(genKey(x, y), adj);
    }
}
const out = route.path(genKey(0, 0), genKey(WIDTH - 1, HEIGHT - 1));
let sum = 0;
out.shift();
out.forEach((coord) => {
    const [x, y] = coord.split('_').map(v => +v);
    sum += fullMap[x][y];
});
console.log('result', sum);
//# sourceMappingURL=index.js.map