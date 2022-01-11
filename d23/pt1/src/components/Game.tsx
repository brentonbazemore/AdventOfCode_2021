import * as React from 'react';
import Cell from './Cell';
import { Cave } from '../types/Cave.class';
import { CellType } from '../types/CellType.enum';
import { Amphipod } from '../types/Amphipod.class';
import { AmphipodType } from '../types/AmphipodType.enum';

interface GameProps {
  initialCave: Cave;
}

const calculateScore = (cave: Cave) => {
  let sum = 0;
  for (let x = 0; x < cave.width; x++) {
    for (let y = 0; y < cave.height; y++) {
      if (AmphipodType[cave.grid[x]?.[y]?.type as number]) {
        const amp = (cave.grid[x]?.[y] as Amphipod);
        console.log(amp);
        sum += (amp.steps * amp.weight);
      } 
    }
  }

  return sum;
}

type Coordinate = { x: number, y: number };

const doMove = (cave: Cave, from: Coordinate, to: Coordinate) => {
  const newCave = JSON.parse(JSON.stringify(cave));
  newCave.grid[to.x][to.y] = cave.grid[from.x][from.y];
  newCave.grid[from.x][from.y] = cave.grid[to.x][to.y];

  (newCave.grid[to.x][to.y] as Amphipod).steps += (Math.abs(from.x - to.x) + Math.abs(from.y - to.y));

  return newCave;
}

const Game: React.FunctionComponent<GameProps> = ({ initialCave }) => {
  const [cave, setCave] = React.useState<Cave>({} as any);
  const [selectedAmphipod, setSelectedAmphipod] = React.useState({
    x: -1,
    y: -1,
  });

  React.useEffect(() => {
    if (initialCave) {
      setCave(initialCave);
    }
  }, [initialCave]);

  let cells = [];
  for (let y = 0; y < cave.height; y++) {
    for (let x = 0; x < cave.width; x++) {
      cells.push(
        <Cell
          key={`${x}_${y}`}
          value={cave.grid[x]?.[y]}
          selected={selectedAmphipod.x === x && selectedAmphipod.y === y}
          handleClick={(cellType: CellType) => {
            if (cellType === CellType.Amphipod) {
              setSelectedAmphipod({ x, y });
            } if (cellType === CellType.Space && selectedAmphipod.x !== -1) {
              // check/do the move; // TODO: Check if valid
              setCave(doMove(cave, selectedAmphipod, { x, y }));
              setSelectedAmphipod({ x: -1, y: -1 });
            }
          }}
        />,
      );
    }
  }

  return (
    <>
      <div
        style={{
          margin: 'auto',
          marginTop: 16,
          maxWidth: `${cave.width * 50}px`,
          display: 'grid',
          gridTemplateColumns: `repeat(${cave.width}, 50px)`,
        }}
      >
        {cells.map((c) => c)}
      </div>
      <span>Score:</span>
      <span>{calculateScore(cave)}</span>
    </>
  );
};

export default Game;
