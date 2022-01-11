import * as React from 'react';

interface FormProps {
  onSubmit: (input: string) => void;
}
 
const Form: React.FunctionComponent<FormProps> = ({ onSubmit }) => {
  const [input, setInput] = React.useState<string>(
`#############
#...........#
###B#B#D#D###
  #D#C#B#A#
  #D#B#A#C#
  #C#C#A#A#
  #########`);


  return ( <>
    <div style={{ display: 'flex', flexDirection: 'column', width: 200, margin: 'auto' }}>
      <label htmlFor="puzzleInput" style={{ marginBottom: 10 }}>Paste your input here:</label>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} id="puzzleInput" rows={7} cols={13} style={{ marginBottom: 10 }}></textarea>
      <button onClick={() => onSubmit(input)}>Start</button>
    </div>
  </> );
}
 
export default Form;