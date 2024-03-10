
import { Box, SxProps } from '@mui/material';
import { BoardShape } from '../../utils/data';
import { Cell } from '../Cell';

interface Props {
  currentBoard: BoardShape;
}


export interface BoardType {
  mainContainer: SxProps,
  row: SxProps
}

export const boardStyle: BoardType = {
  mainContainer:{
    border: '5px solid white',
    userSelect: 'none',
    margin: 'auto',
    gridArea: 'game',
    borderRadius:'5px',
    },
  row:{
    display: 'flex'
  }
  }
  




const Board:React.FC<Props> = ({ currentBoard }) => {
  return (
    <Box sx={boardStyle.mainContainer} >
      {currentBoard.map((row, rowIndex) => (
        <Box sx={boardStyle.row} key={`${rowIndex}`}>
          {row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} type={cell} />
          ))}
        </ Box>
      ))}
    </ Box>
  );
}

export default Board;

/*
.board {
  
}

.controls {
  grid-area: controls;
}

.row {
  
}
*/