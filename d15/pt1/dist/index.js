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
const findShortestPath = require("./dijkstras2");
// Toggle this to switch input files
const testInput = false;
// #################################
const rawData = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data = rawData.split('\n');
const genKey = (x, y) => `${x}_${y}`;
const cavernGraph = {};
const WIDTH = data[0].length;
const HEIGHT = data.length;
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
            if (((_a = data[ny]) === null || _a === void 0 ? void 0 : _a[nx]) != null) {
                adj[genKey(nx, ny)] = +data[ny][nx];
            }
        });
        cavernGraph[genKey(x, y)] = adj;
    }
}
const out = findShortestPath(cavernGraph, genKey(0, 0), genKey(WIDTH - 1, HEIGHT - 1));
console.log(out.distance);
// for (let x = 0; x < WIDTH; x++) {
//   for (let y = 0; y < HEIGHT; y++) {
//     const neighbors = [
//       [x, y + 1],
//       [x + 1, y],
//       [x, y - 1],
//       [x - 1, y]
//     ];
//     const top = data[y + 1]?.[x];
//     const right = data[y]?.[x + 1];
//     const bottom = data[y - 1]?.[x];
//     const left = data[y]?.[x - 1];
//     const adj: { [key: string]: number } = {};
//     neighbors.forEach(([nx, ny]) => {
//       if (data[ny]?.[nx] != null) {
//         adj[genKey(nx, ny)] = +data[ny][nx];
//       }
//     });
//     cavernMap[genKey(x, y)] = adj;
//   }
// }
// for (let i = 0; i < data.length; i++) {
//   const row = data[i];
//   for (let j = 0; j < row.length; j++) {
//     if (!cavernMap[j]) {
//       cavernMap[j] = {};
//     }
//     cavernMap[j][i] = +row[j];
//   }
// }
// const graph = new dijkstras.Graph(cavernMap);
// for (let y = 0; y < 10; y++) {
//   let str = '';
//   for (let x = 0; x < 10; x++) {
//     str += cavernMap[x][y];
//   }
//   console.log(str);
// }
//# sourceMappingURL=index.js.map