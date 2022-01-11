import { Amphipod } from "./Amphipod.class";
import { Grid } from "./Grid.type";
import { Space } from "./Space.type";

export class Cave {
  grid: Grid<Amphipod | Space>;
  height: number;
  width: number;

  constructor(grid: Grid<Amphipod | Space>, height: number, width: number) {
    this.grid = grid;
    this.height = height;
    this.width = width;
  }
}