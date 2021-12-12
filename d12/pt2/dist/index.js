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
class Cave {
    constructor(name) {
        this.connections = new Set();
        this.name = name;
        this.type = name === name.toUpperCase() ? 'BIG' : 'SMALL';
    }
    addConnection(connectionName) {
        this.connections.add(connectionName);
    }
}
const caves = {};
data.forEach((d) => {
    const [a, b] = d.split('-');
    if (!caves[a]) {
        caves[a] = new Cave(a);
    }
    if (!caves[b]) {
        caves[b] = new Cave(b);
    }
    caves[a].addConnection(b);
    caves[b].addConnection(a);
});
// const paths = [];
let pathsToEnd = 0;
const findPath = (curCave, pathSoFar) => {
    if (pathSoFar[pathSoFar.length - 1] === curCave.name
        || (curCave.type === 'SMALL' && pathSoFar.includes(curCave.name))) {
        return;
    }
    pathSoFar += ',' + curCave.name;
    if (curCave.name === 'end') {
        pathsToEnd++;
        return;
        // paths.push(pathSoFar);
    }
    curCave.connections.forEach((nextCave) => {
        findPath(caves[nextCave], pathSoFar);
    });
};
findPath(caves['start'], '');
console.log(pathsToEnd);
//# sourceMappingURL=index.js.map