import * as fs from 'fs';

// Toggle this to switch input files
const testInput = true;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');
