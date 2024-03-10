import { useReducer, Dispatch } from 'react';
import { Block, BlockLevel1, BlockLevel2, BlockLevel3, BlockShape, BoardShape, EmptyCell, SHAPES } from '../../utils/data';

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

type BoardState = {
  board: BoardShape;
  droppingRow: number;
  droppingColumn: number;
  droppingBlock: Block;
  droppingShape: BlockShape;
};


const useTetrisBoard = (): [BoardState, Dispatch<Action>] => {
  const [boardState, dispatchBoardState] = useReducer(
    boardReducer,
    {
      board: [],
      droppingRow: 0,
      droppingColumn: 0,
      droppingBlock: Block.I,
      droppingShape: SHAPES.I.shape,
    },
    (emptyState) => {
      const state = {
        ...emptyState,
        board: getEmptyBoard(),
      };
      return state;
    }
  );

  return [boardState, dispatchBoardState];
}

export function getEmptyBoard(height = BOARD_HEIGHT): BoardShape {
  return Array(height)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(EmptyCell.Empty));
}

export function hasCollisions(
  board: BoardShape,
  currentShape: BlockShape,
  row: number,
  column: number
): boolean {
  let hasCollision = false;
  currentShape
    .filter((shapeRow) => shapeRow.some((isSet) => isSet))
    .forEach((shapeRow: boolean[], rowIndex: number) => {
      shapeRow.forEach((isSet: boolean, colIndex: number) => {
        if (
          isSet &&
          (row + rowIndex >= board.length ||
            column + colIndex >= board[0].length ||
            column + colIndex < 0 ||
            board[row + rowIndex][column + colIndex] !== EmptyCell.Empty)
        ) {
          hasCollision = true;
        }
      });
    });
  return hasCollision;
}
type BlockType = keyof typeof Block;

export function getRandomBlock(level: number | undefined): Block {
  let blockValues: BlockType[];
  let aux: BlockType;

  switch (level) {
    case 1:
      blockValues = Object.values(BlockLevel1);
      break;
    case 2:
      blockValues = Object.values(BlockLevel2);
      break;
    case 3:
      blockValues = Object.values(BlockLevel3);
      break;
    default:
      blockValues = Object.values(Block);
      break;
  }

  aux = blockValues[Math.floor(Math.random() * blockValues.length)];
  return aux as Block;
}


/*export function getRandomBlock(level:number | undefined): Block {
  
  switch (level) {
    case 1:
    
      // Tu lógica para el caso 1
      break;
    case 2:
      console.log("El número es 2");
    
      // Tu lógica para el caso 2
      break;
    case 3:
      
      console.log("El número es 3");
      // Tu lógica para el caso 3
      break;
    default:
      console.log("Número no reconocido");
      // Lógica para valores que no son 1, 2 o 3
  }
  const blockValues = Object.values(Block);
  const aux = blockValues[Math.floor(Math.random() * blockValues.length)] as Block;
  return aux
}*/

function rotateBlock(shape: BlockShape): BlockShape {
  const rows = shape.length;
  const columns = shape[0].length;

  const rotated = Array(rows)
    .fill(null)
    .map(() => Array(columns).fill(false));

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      rotated[column][rows - 1 - row] = shape[row][column];
    }
  }

  return rotated;
}

type Action = {
  type: 'start' | 'drop' | 'commit' | 'move';
  newBoard?: BoardShape;
  newBlock?: Block;
  isPressingLeft?: boolean;
  isPressingRight?: boolean;
  isRotating?: boolean;
  level?: number;
};

function boardReducer(state: BoardState, action: Action): BoardState {
  let newState = { ...state };

  switch (action.type) {
    case 'start':
      const firstBlock = getRandomBlock(action.level);
      return {
        board: getEmptyBoard(),
        droppingRow: 0,
        droppingColumn: 3,
        droppingBlock: firstBlock,
        droppingShape: SHAPES[firstBlock].shape,
      };
    case 'drop':
      newState.droppingRow++;
      break;
    case 'commit':
      return {
        board: [
          ...getEmptyBoard(BOARD_HEIGHT - action.newBoard!.length),
          ...action.newBoard!,
        ],
        droppingRow: 0,
        droppingColumn: 3,
        droppingBlock: action.newBlock!,
        droppingShape: SHAPES[action.newBlock!].shape,
      };
    case 'move':
      const rotatedShape = action.isRotating
        ? rotateBlock(newState.droppingShape)
        : newState.droppingShape;
      let columnOffset = action.isPressingLeft ? -1 : 0;
      columnOffset = action.isPressingRight ? 1 : columnOffset;
      if (
        !hasCollisions(
          newState.board,
          rotatedShape,
          newState.droppingRow,
          newState.droppingColumn + columnOffset
        )
      ) {
        newState.droppingColumn += columnOffset;
        newState.droppingShape = rotatedShape;
      }
      break;
    default:
      const unhandledType: never = action.type;
      throw new Error(`Unhandled action type: ${unhandledType}`);
  }

  return newState;
}


export default useTetrisBoard