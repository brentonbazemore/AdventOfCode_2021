import * as fs from 'fs';
// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');
const rawHex = data[0]
// numbers encoded msb
// 3 = version: number
// 3 = type ID: number

const hex2bin = (hex: string) => {
  let out = '';
  for (let i = 0; i < hex.length; i++) {
    out += parseInt(hex[i], 16).toString(2).padStart(4, '0'); 
  }
  return out;
}

const bits = hex2bin(rawHex);

const getVersion = (position: number) => {
  return { value: +parseInt(bits.substr(position, 3), 2).toString(10), position: position + 3 };
};

const getType = (position: number) => {
  return { value: +parseInt(bits.substr(position, 3), 2).toString(10), position: position + 3 };
};

const getLiteral = (position: number) => {
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

const getLengthType = (position: number) => {
  return { value: +bits[position], position: position + 1 };
};

const getLengthInBits = (position: number) => {
  return { value: +parseInt(bits.substr(position, 15), 2).toString(10), position: position + 15 };
};

const getSubPacketCount = (position: number) => {
  return { value: +parseInt(bits.substr(position, 11), 2).toString(10), position: position + 11 };
};

let globalVersionSum = 0;
const incGVS = (value: number) => {
  const newVal = globalVersionSum + value;
  globalVersionSum = newVal;
}

const parsePacketByLength = (pointer: number, length: number) => {
  console.log('length');
  const ogPointer = pointer;
  const packets = [];
  while (pointer < (ogPointer + length)) {
    let packet = parsePacket(pointer);
    pointer = packet.position;
    packets.push(packet.value);
  }

  return { position: pointer, values: packets };
}

const parsePacketByCount = (pointer: number, count: number) => {
  console.log('count');
  let seenPackets = 0;
  const packets = [];
  while (seenPackets < count) {
    let packet = parsePacket(pointer);
    pointer = packet.position;
    packets.push(packet.value);

    seenPackets++;
  }

  return { position: pointer, values: packets };
}

const parsePacket = (pointer: number): { position: number, value: number } => {
  const version = getVersion(pointer);
  pointer = version.position;
  incGVS(version.value);

  const type = getType(pointer);
  pointer = type.position;

  let value;
  if (type.value === 4) {
    const literal = getLiteral(pointer);
    pointer = literal.position;
    value = literal.value;
  } else {
    const lengthType = getLengthType(pointer);
    pointer = lengthType.position;
    let packets;
    
    let children;
    if (lengthType.value === 0) {
      const lengthInBits = getLengthInBits(pointer);
      pointer = lengthInBits.position;
      children = parsePacketByLength(pointer, lengthInBits.value);
    } else {
      const subPacketCount = getSubPacketCount(pointer);
      pointer = subPacketCount.position;
      children = parsePacketByCount(pointer, subPacketCount.value);
    }
    pointer = children.position;
    packets = children.values;

    if (type.value === 0) {
      value = packets.reduce((acc, cur) => acc + cur, 0);
    } else if (type.value === 1) {
      value = packets.reduce((acc, cur) => acc * cur, 1);
    } else if (type.value === 2) {
      value = Math.min(...packets);
    } else if (type.value === 3) {
      value = Math.max(...packets);
    } else if (type.value === 5) {
      value = +(packets[0] > packets[1]);
    } else if (type.value === 6) {
      value = +(packets[0] < packets[1]);
    } else if (type.value === 7) {
      value = +(packets[0] === packets[1]);
    } else {
      console.log('bruh');
      value = 0;
    }
  }

  return { position: pointer, value };
}

console.log(parsePacket(0));