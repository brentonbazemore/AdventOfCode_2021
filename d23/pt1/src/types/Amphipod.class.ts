import { AmphipodType } from "./AmphipodType.enum";

const amphipodWeights = {
  [AmphipodType.A]: 1,
  [AmphipodType.B]: 10,
  [AmphipodType.C]: 100,
  [AmphipodType.D]: 1000,
}

export class Amphipod {
  type: AmphipodType;
  steps: number;
  weight: number;

  constructor(type: AmphipodType) {
    this.type = type;
    this.steps = 0;
    this.weight = amphipodWeights[type];
  }
}