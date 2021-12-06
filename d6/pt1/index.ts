import * as fs from 'fs';

// Toggle this to switch input files
const testInput = false;
// #################################

const rawData: string = fs.readFileSync(testInput ? 'inputTest.txt' : 'input.txt', 'utf8');
const data: number[] = rawData.split('\n')[0].split(',').map(n => +n);

class LanternFish {
  timer: number;

  constructor(cycle: number) {
    this.timer = cycle;
  }

  tick() {
    let out: LanternFish | null = null;
    if (this.timer === 0) {
      // spawn new fish and add to list
      out = new LanternFish(8);
      this.timer = 6;
    } else {
      this.timer--;
    }

    return out;
  }
}

// spawn initial fish
const fishes = data.map((num) => new LanternFish(num));

const DAYS = 80;
for (let i = 0; i < DAYS; i++) {
  const newFishes: LanternFish[] = []; 
  fishes.forEach((fish) => {
    const newFish = fish.tick();
    if (newFish) {
      newFishes.push(newFish);
    }
  });
  fishes.push(...newFishes);
}

console.log(fishes.length);