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
const instructions = data.map((row => {
    const [dir, rest] = row.split(' ');
    const [rawX, rawY, rawZ] = rest.split(',');
    const [x1, x2] = rawX.split('..').map(s => s.replace('x=', '')).map(n => +n);
    const [y1, y2] = rawY.split('..').map(s => s.replace('y=', '')).map(n => +n);
    const [z1, z2] = rawZ.split('..').map(s => s.replace('z=', '')).map(n => +n);
    return {
        toggle: dir,
        x: [x1, x2],
        y: [y1, y2],
        z: [z1, z2],
    };
}));
class Cube {
    constructor(x1, x2, y1, y2, z1, z2, state = 'on') {
        this.start = {
            x: x1,
            y: y1,
            z: z1,
        };
        this.end = {
            x: x2,
            y: y2,
            z: z2,
        };
        this.sizeX = x2 - x1;
        this.sizeY = y2 - y1;
        this.sizeZ = z2 - z1;
        this.state = state;
    }
    intersects(cube) {
        if (this.start.x <= cube.end.x
            && this.end.x >= cube.start.x
            && this.start.y <= cube.end.y
            && this.end.y >= cube.start.y
            && this.start.z <= cube.end.z
            && this.end.z >= cube.start.z) {
            return true;
        }
        return false;
    }
}
;
const calculateIntersectionCube = (cube1, cube2) => {
    const xStart = Math.max(cube1.start.x, cube2.start.x);
    const xEnd = Math.min(cube1.end.x, cube2.end.x);
    const yStart = Math.max(cube1.start.y, cube2.start.y);
    const yEnd = Math.min(cube1.end.y, cube2.end.y);
    const zStart = Math.max(cube1.start.z, cube2.start.z);
    const zEnd = Math.min(cube1.end.z, cube2.end.z);
    return new Cube(xStart, xEnd, yStart, yEnd, zStart, zEnd, cube1.state === 'on' ? 'off' : 'on');
};
let litCubes = [];
instructions.forEach((instruction) => {
    const newCube = new Cube(instruction.x[0], instruction.x[1] + 1, instruction.y[0], instruction.y[1] + 1, instruction.z[0], instruction.z[1] + 1);
    const counterCubes = [];
    litCubes.forEach(cube => {
        if (newCube.intersects(cube)) {
            counterCubes.push(calculateIntersectionCube(cube, newCube));
        }
    });
    litCubes.push(...counterCubes);
    if (instruction.toggle === 'on') {
        litCubes.push(newCube);
    }
});
let sum = 0;
litCubes.forEach((cube) => {
    const volume = cube.sizeX * cube.sizeY * cube.sizeZ;
    if (cube.state === 'on') {
        sum += volume;
    }
    else {
        sum -= volume;
    }
});
console.log(sum);
//# sourceMappingURL=index.js.map