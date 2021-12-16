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
const rawHex = data[0];
// numbers encoded msb
// 3 = version: number
// 3 = type ID: number
const hex2bin = (hex) => {
    let out = '';
    for (let i = 0; i < hex.length; i++) {
        out += parseInt(hex[i], 16).toString(2).padStart(4, '0');
    }
    return out;
};
const bits = hex2bin(rawHex);
const getVersion = (position) => {
    return { value: +parseInt(bits.substr(position, 3), 2).toString(10), position: position + 3 };
};
const getType = (position) => {
    return { value: +parseInt(bits.substr(position, 3), 2).toString(10), position: position + 3 };
};
const getLiteral = (position) => {
    console.log('literal');
    let signalBit = bits[position];
    let value = '';
    while (true) {
        signalBit = bits[position];
        const chunk = bits.substr(position, 5);
        value += chunk.substr(1);
        position += 5;
        if (signalBit == '0') {
            break;
        }
    }
    return { value: +parseInt(value, 2).toString(10), position };
};
const getLengthType = (position) => {
    return { value: +bits[position], position: position + 1 };
};
const getLengthInBits = (position) => {
    return { value: +parseInt(bits.substr(position, 15), 2).toString(10), position: position + 15 };
};
const getSubPacketCount = (position) => {
    return { value: +parseInt(bits.substr(position, 11), 2).toString(10), position: position + 11 };
};
let globalVersionSum = 0;
const incGVS = (value) => {
    const newVal = globalVersionSum + value;
    globalVersionSum = newVal;
};
const parsePacketByLength = (pointer, length) => {
    console.log('length');
    const ogPointer = pointer;
    while (pointer < (ogPointer + length)) {
        const version = getVersion(pointer);
        if (isNaN(version.value)) {
            console.log('uh oh');
        }
        pointer = version.position;
        if (pointer > bits.length) {
            break;
        }
        incGVS(version.value);
        const type = getType(pointer);
        pointer = type.position;
        if (type.value === 4) {
            const literal = getLiteral(pointer);
            pointer = literal.position;
        }
        else {
            const lengthType = getLengthType(pointer);
            pointer = lengthType.position;
            if (lengthType.value === 0) {
                const lengthInBits = getLengthInBits(pointer);
                pointer = lengthInBits.position;
            }
            else {
                const subPacketCount = getSubPacketCount(pointer);
                pointer = subPacketCount.position;
            }
        }
    }
    return pointer;
};
const parsePacketByCount = (pointer, count) => {
    console.log('count');
    let seenPackets = 0;
    while (seenPackets < count) {
        const version = getVersion(pointer);
        pointer = version.position;
        if (isNaN(version.value)) {
            console.log('uh oh');
        }
        incGVS(version.value);
        const type = getType(pointer);
        pointer = type.position;
        if (type.value === 4) {
            const literal = getLiteral(pointer);
            pointer = literal.position;
        }
        else {
            const lengthType = getLengthType(pointer);
            pointer = lengthType.position;
            if (lengthType.value === 0) {
                const lengthInBits = getLengthInBits(pointer);
                pointer = lengthInBits.position;
                pointer = parsePacketByLength(pointer, lengthInBits.value);
            }
            else {
                const subPacketCount = getSubPacketCount(pointer);
                pointer = subPacketCount.position;
                pointer = parsePacketByCount(pointer, subPacketCount.value);
            }
        }
        seenPackets++;
    }
    return pointer;
};
const parsePacket = (position) => {
    console.log('og');
    const version = getVersion(position);
    position = version.position;
    if (isNaN(version.value)) {
        console.log('uh oh');
    }
    incGVS(version.value);
    const type = getType(position);
    position = type.position;
    if (type.value === 4) {
        const literal = getLiteral(position);
        position = literal.position;
    }
    else {
        const lengthType = getLengthType(position);
        position = lengthType.position;
        if (lengthType.value === 0) {
            const lengthInBits = getLengthInBits(position);
            position = lengthInBits.position;
            position = parsePacketByLength(position, lengthInBits.value);
        }
        else {
            const subPacketCount = getSubPacketCount(position);
            position = subPacketCount.position;
            position = parsePacketByCount(position, subPacketCount.value);
        }
    }
};
parsePacket(0);
console.log(globalVersionSum);
//# sourceMappingURL=index.js.map