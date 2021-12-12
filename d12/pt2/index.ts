import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: string[] = rawData.split('\n');

class Cave {
  name: string;
  type: 'BIG' | 'SMALL';
  connections = new Set<string>();

  constructor(name: string) {
    this.name = name;
    this.type = name === name.toUpperCase() ? 'BIG' : 'SMALL';
  }

  addConnection(connectionName: string) {
    this.connections.add(connectionName);
  }
}

const caves: { [name: string]: Cave } = {};

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
const findPath = (curCave: Cave, pathSoFar: string) => {
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