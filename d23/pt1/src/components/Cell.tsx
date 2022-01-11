import * as React from 'react';
import { Amphipod } from '../types/Amphipod.class';
import { AmphipodType } from '../types/AmphipodType.enum';
import { CellType } from '../types/CellType.enum';
import { Space } from '../types/Space.type';

interface CellProps {
  value: Amphipod | Space | null;
  selected?: boolean;
  handleClick: (cellType: CellType) => void;
}

const style = (bg: string = 'grey') => ({
  width: 50,
  height: 50,
  backgroundColor: bg,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
 
const Cell: React.FunctionComponent<CellProps> = ({ value, selected, handleClick }) => {
  if (!value) {
    return <div style={ style('black') }></div>
  }
  
  if (value.type === 'space') {
    return <div style={ style('white') } onClick={() => handleClick(CellType.Space)} ></div>
  }
  
  return <div style={ style(selected ? 'blue' : 'green') } onClick={() => handleClick(CellType.Amphipod)} >
    <span style={{ pointerEvents: 'none' }}>{AmphipodType[value.type]}</span>
  </div>
}
 
export default Cell;