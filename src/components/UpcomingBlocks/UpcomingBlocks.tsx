import { Box } from '@mui/material';
import { Cell } from '..';
import { Block, HiddenCell, SHAPES } from '../../utils/data';

interface Props {
  upcomingBlocks: Block[];
}

const UpcomingBlocks = ({ upcomingBlocks }: Props) => {
  return (
    <Box className="upcoming">
      {upcomingBlocks.map((block, blockIndex) => {
        const shape = SHAPES[block].shape.filter((row) =>
          row.some((cell) => cell)
        );
        return (
          <Box key={blockIndex}>
            {shape.map((row, rowIndex) => {
              return (
                <Box key={rowIndex} className="row">
                  {row.map((isSet, cellIndex) => {
                    const cellClass = isSet ? block : 'hidden' as HiddenCell;
                    return (
                      <Cell type={cellClass} key={`${cellIndex}`}></Cell>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}

export default UpcomingBlocks;