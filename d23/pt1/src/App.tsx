import React from 'react';
import Form from './components/Form';
import Game from './components/Game';
import { Grid } from './types/Grid.type';
import { Amphipod } from './types/Amphipod.class';
import { AmphipodType } from './types/AmphipodType.enum';
import { Space } from './types/Space.type';
import './App.css';
import { Cave } from './types/Cave.class';

const parseInput = (input: string) => {
  console.log(input);
  const data = input.split('\n');

  let spaces: Grid<Amphipod | Space> = {};
  for (let y = 0; y < data.length; y++) {
    let line = data[y];
    for (let x = 0; x < line.length; x++) {
      if (data[y][x] === '.') {
        if (!spaces[x]) {
          spaces[x] = {};
        }
        spaces[x][y] = { type: 'space' };
      } else if (['A', 'B', 'C', 'D'].includes(data[y][x])) {
        if (!spaces[x]) {
          spaces[x] = {};
        }
        let type: keyof typeof AmphipodType = data[y][x] as any;
        spaces[x][y] = new Amphipod(AmphipodType[type]);
      }
    }
  }

  return spaces;
}

function App() {
  const [initialCave, setInitialCave] = React.useState<Cave | null>(null);

  const handleSubmit = (input: string) => {
    const lines = input.split('\n');
    setInitialCave(new Cave(parseInput(input), lines.length, lines[0].length));
  }


  return (
    <div className="App">
      <Form onSubmit={handleSubmit} />
      {initialCave && <Game initialCave={initialCave} />}
    </div>
  );
}

export default App;
