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
require("lodash.permutations");
const lodash_1 = __importDefault(require("lodash"));
// Toggle this to switch input files
const testInput = false;
// #################################
const rawData = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data = rawData.split('\n');
const add = (a, b) => {
    return [a, b];
};
const getNode = (num, path) => {
    let node = num;
    if (path.length === 0) {
        return node;
    }
    for (let i = 0; i < path.length; i++) {
        node = node[path[i]];
        if (node == null) {
            return null;
        }
    }
    return node;
};
const modifyNode = (num, path, value, leftOrRight) => {
    let node = num;
    if (path.length !== 0) {
        for (let i = 0; i < path.length; i++) {
            node = node[path[i]];
        }
    }
    node[leftOrRight] = value;
    // // console.log(JSON.stringify(num));
};
const findMarkedNode = (num, path) => {
    const leftPath = path + (path && ',') + '0';
    const rightPath = path + (path && ',') + '1';
    if (Array.isArray(num[0])) {
        const foundPath = findMarkedNode(num[0], leftPath);
        if (foundPath != null) {
            return foundPath;
        }
    }
    if (Array.isArray(num[1])) {
        const foundPath = findMarkedNode(num[1], rightPath);
        if (foundPath != null) {
            return foundPath;
        }
    }
    if (typeof num[0] === 'number' && num[0] < 0.2 && num[0] > 0) {
        return { path: leftPath };
    }
    if (typeof num[1] === 'number' && num[1] < 0.2 && num[1] > 0) {
        return { path: rightPath };
    }
    return null;
};
const findNextLeft = (num, path) => {
    let deepCopy = JSON.parse(JSON.stringify(num));
    let node = deepCopy;
    for (let i = 0; i < path.length; i++) {
        node = node[path[i]];
    }
    node[0] += 'a';
    let deepString = JSON.stringify(deepCopy);
    const start = deepString.indexOf('a') - 3;
    let next = -1;
    for (let i = start; i > 0; i--) {
        if (!isNaN(+deepString[i]) && isNaN(+deepString[i - 1])) {
            next = i;
            deepString = deepString.slice(0, i) + '0.100' + deepString.slice(i);
            break;
        }
    }
    if (next !== -1) {
        const markedNode = findMarkedNode(JSON.parse(deepString), '');
        if (markedNode != null) {
            const markedPath = markedNode.path.split(',').map(n => +n);
            const markedValue = +getNode(num, markedPath);
            const markedSide = markedPath.pop();
            return { value: markedValue, path: markedPath, side: markedSide };
        }
    }
    return null;
};
const findNextRight = (num, path) => {
    let deepCopy = JSON.parse(JSON.stringify(num));
    let node = deepCopy;
    for (let i = 0; i < path.length; i++) {
        node = node[path[i]];
    }
    node[1] += 'a';
    let deepString = JSON.stringify(deepCopy);
    const start = deepString.indexOf('a');
    let next = -1;
    for (let i = start; i < deepString.length; i++) {
        if (!isNaN(+deepString[i])) {
            next = i;
            deepString = deepString.slice(0, i) + '0.100' + deepString.slice(i);
            break;
        }
    }
    if (next !== -1) {
        const markedNode = findMarkedNode(JSON.parse(deepString), '');
        if (markedNode != null) {
            const markedPath = markedNode.path.split(',').map(n => +n);
            const markedValue = +getNode(num, markedPath);
            const markedSide = markedPath.pop();
            return { value: markedValue, path: markedPath, side: markedSide };
        }
    }
    return null;
};
const explode = (fullNum, path) => {
    const splitPath = path.length ? path.split(',').map(n => +n) : [];
    const leftPath = [...splitPath, 0];
    const rightPath = [...splitPath, 1];
    const leftNode = getNode(fullNum, leftPath);
    const rightNode = getNode(fullNum, rightPath);
    let leaf = typeof leftNode === 'number' && typeof rightNode === 'number';
    if (leaf) {
        const splitPath = path.split(',').map(n => +n);
        if (splitPath.length >= 4) {
            // console.log('preexplode', JSON.stringify(fullNum));
            // console.log('exploding path', splitPath, JSON.stringify(getNode(fullNum, splitPath)));
            const nextLeft = findNextLeft(fullNum, splitPath);
            // console.log({nextLeft}, nextLeft && JSON.stringify(getNode(fullNum, nextLeft.path)));
            if (nextLeft != null) {
                modifyNode(fullNum, nextLeft.path, nextLeft.value + (+leftNode), nextLeft.side);
            }
            const nextRight = findNextRight(fullNum, splitPath);
            // console.log({nextRight}, nextRight && JSON.stringify(getNode(fullNum, nextRight.path)));
            if (nextRight != null) {
                modifyNode(fullNum, nextRight.path, nextRight.value + (+rightNode), nextRight.side);
            }
            const upOnePath = splitPath.slice(0, splitPath.length - 1);
            modifyNode(fullNum, upOnePath, 0, splitPath[splitPath.length - 1]);
            // console.log(JSON.stringify(fullNum));
            return true;
        }
    }
    else {
        if (typeof leftNode !== 'number') {
            if (explode(fullNum, leftPath.join(','))) {
                return true;
            }
        }
        if (typeof rightNode !== 'number') {
            if (explode(fullNum, rightPath.join(','))) {
                return true;
            }
        }
    }
    return false;
};
const split = (fullNum, path) => {
    const splitPath = path.length ? path.split(',').map(n => +n) : [];
    const leftPath = [...splitPath, 0];
    const rightPath = [...splitPath, 1];
    const leftNode = getNode(fullNum, leftPath);
    const rightNode = getNode(fullNum, rightPath);
    if (leftNode == null && rightNode == null) {
        return false;
    }
    if (typeof leftNode === 'number' && leftNode >= 10) {
        // console.log({leftNode});
        const newLeft = Math.floor(leftNode / 2);
        const newRight = Math.ceil(leftNode / 2);
        const side = leftPath.pop();
        // console.log('presplitLeft', JSON.stringify(fullNum));
        modifyNode(fullNum, leftPath, [newLeft, newRight], side);
        // console.log('splitLeft', JSON.stringify(fullNum));
        return true;
    }
    if (split(fullNum, leftPath.join(','))) {
        return true;
    }
    if (typeof rightNode === 'number' && rightNode >= 10) {
        // console.log({rightNode});
        const newLeft = Math.floor(rightNode / 2);
        const newRight = Math.ceil(rightNode / 2);
        const side = rightPath.pop();
        // console.log('presplitRight', JSON.stringify(fullNum));
        modifyNode(fullNum, rightPath, [newLeft, newRight], side);
        // console.log('splitRight', JSON.stringify(fullNum));
        return true;
    }
    if (split(fullNum, rightPath.join(','))) {
        return true;
    }
    return false;
};
const reduce = (fullNum) => {
    // console.log('try explode');
    if (explode(fullNum, '')) {
        // console.log('did explode', JSON.stringify(fullNum))
        // console.log('did explode');
        return true;
    }
    // console.log('try split');
    if (split(fullNum, '')) {
        // console.log('did split  ', JSON.stringify(fullNum));
        // console.log('did split');
        return true;
    }
    // console.log('no more reductions');
    return false;
};
const magnify = (fullNum, path) => {
    const splitPath = path.length ? path.split(',').map(n => +n) : [];
    const leftPath = [...splitPath, 0];
    const rightPath = [...splitPath, 1];
    const leftNode = getNode(fullNum, leftPath);
    const rightNode = getNode(fullNum, rightPath);
    if (leftNode == null && rightNode == null) {
        return false;
    }
    if (typeof leftNode === 'number' && typeof rightNode === 'number') {
        const side = splitPath.pop();
        modifyNode(fullNum, splitPath, ((leftNode * 3) + (rightNode * 2)), side);
        return true;
    }
    if (magnify(fullNum, leftPath.join(','))) {
        return true;
    }
    if (magnify(fullNum, rightPath.join(','))) {
        return true;
    }
    return false;
};
const permutations = lodash_1.default.permutations(data, 2);
let maxMag = 0;
permutations.forEach(perm => {
    let sum = JSON.parse(perm[0]);
    for (let i = 1; i < perm.length; i++) {
        const line = perm[i];
        const num = JSON.parse(line);
        sum = add(sum, num);
        while (true) {
            if (!reduce(sum)) {
                break;
            }
        }
    }
    let result = JSON.parse(JSON.stringify(sum));
    while (true) {
        magnify(result, '');
        if (result.every((n) => typeof n === 'number')) {
            maxMag = Math.max(maxMag, result[0] * 3 + result[1] * 2);
            break;
        }
    }
});
console.log(maxMag);
// explode(JSON.parse('[[[[[9,8],1],2],3],4]'), '');
// explode(JSON.parse('[7,[6,[5,[4,[3,2]]]]]'), '');
// console.log(explode(JSON.parse('[[6,[5,[4,[3,2]]]],1]'), ''));
// explode(JSON.parse('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'), '');
// explode(JSON.parse('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'), '');
// console.log(explode(JSON.parse('[[3,[2,[8,0]]],[9,[5,[7,0]]]]'), ''));
// split(JSON.parse('[[[[0,7],4],[15,[0,13]]],[1,1]]'), '');
// // console.log(split(JSON.parse('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'), ''));
//# sourceMappingURL=index.js.map