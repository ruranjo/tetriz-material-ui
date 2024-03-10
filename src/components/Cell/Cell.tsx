import { Box, SxProps } from '@mui/material';
import { CellOptions, cellColors } from '../../utils/data';
import { cellWidthCellBig, cellWidthCellSmall } from '../../styles/global';

interface Props {
  type: CellOptions ;
}

export interface cellStyleType {
  cell: SxProps
}

export const cellStyle: cellStyleType = {
  cell:{
    width: cellWidthCellBig,
    aspectRatio: 1,
    border: '1px solid black',
    borderRadius:'4px',
    '@media screen and (max-width: 440px)': {
      width: cellWidthCellSmall,
      
    },
  }
}

export const getCellColor = (type: CellOptions) =>{
  if (type === 'hidden'){ 
    return "";
  }else{
    return cellColors[type];
  }
  
}

const Cell:React.FC<Props> = ({ type }) => {
  return <Box sx={{ ...cellStyle.cell, backgroundColor:getCellColor(type), visibility: type === 'hidden' ? 'hidden' : 'visible' }} ></Box>;
}

export default Cell;

