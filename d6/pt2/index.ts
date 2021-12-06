import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: number[] = rawData.split('\n')[0].split(',').map(n => +n);

class LanternFish {
  timer: number;
  count: number;

  constructor(cycle: number, count: number) {
    this.timer = cycle;
    this.count = count;
  }

  tick() {
    let spawn = false;
    if (this.timer === 0) {
      // spawn new fish and add to list
      spawn = true;
      this.timer = 6;
    } else {
      this.timer--;
    }

    return spawn;
  }
}

// spawn initial fish
let fishFreq: { [timer: number]: number } = {};
data.forEach((num) => {
  fishFreq[num] = (fishFreq[num] || 0) + 1
});

const fishes = Object.keys(fishFreq).map((timer) => new LanternFish(+timer, fishFreq[+timer]));

const DAYS = 256;
for (let i = 0; i < DAYS; i++) {
  let newFishCount = 0;
  fishes.forEach((fish) => {
    const spawnNewFish = fish.tick();
    if (spawnNewFish) {
      newFishCount += fish.count;
    }
  });

  fishes.push(new LanternFish(8, newFishCount));
}

let total = 0;
fishes.forEach(f => total += f.count);
console.log(fishes.length);