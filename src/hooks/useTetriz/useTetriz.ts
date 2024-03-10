import { useCallback, useEffect, useState } from 'react';
import { Block, BlockShape, BoardShape, EmptyCell, SHAPES } from '../../utils/data';
import { useInterval } from '..';
import useTetrisBoard, { BOARD_HEIGHT, getEmptyBoard, getRandomBlock, hasCollisions } from '../useTetrizBoard/useTetrizBoard';

// Enum para la velocidad del tick
enum TickSpeed {
  Normal = 800,
  FastMovil = 400,
  Sliding = 100,
  Fast = 50,
}

// Función principal del gancho personalizado useTetris
const useTetris = (level:number) => {
  // Estados del juego
const [score, setScore] = useState(0); // Almacena el puntaje del jugador
const [upcomingBlocks, setUpcomingBlocks] = useState<Block[]>([]); // Almacena la lista de bloques que se mostrarán próximamente en el juego
const [isCommitting, setIsCommitting] = useState(false);// Indica si el juego está en el proceso de confirmar la posición de la pieza en caída
const [isPlaying, setIsPlaying] = useState(false);// Indica si el juego está en curso
const [tickSpeed, setTickSpeed] = useState<TickSpeed | null>(null);// Almacena la velocidad del tick del juego. Puede ser null si el juego no está en curso.

  // Estado del tablero y sus propiedades
  const [
    { board, droppingRow, droppingColumn, droppingBlock, droppingShape },
    dispatchBoardState,
  ] = useTetrisBoard();

  const handleButtonLeft = () => {
    let isPressingLeft = true;
    let isPressingRight = false;
    dispatchBoardState({
      type: 'move',
      isPressingLeft,
      isPressingRight,
    });
  }

  const handleButtonRight = () => {
    let isPressingLeft = false;
    let isPressingRight = true;
    dispatchBoardState({
      type: 'move',
      isPressingLeft,
      isPressingRight,
    });
  }
  const handleButtonRotate = () => {
    dispatchBoardState({
      type: 'move',
      isRotating: true,
    });
  }

  const handleButtonFast = () => {
    if(tickSpeed  === TickSpeed.Normal ){
      setTickSpeed(TickSpeed.FastMovil);
    }else{
      setTickSpeed(TickSpeed.Normal);
    }
  }
  

  // Función para iniciar el juego
  const startGame = useCallback(() => {
    const startingBlocks = [
      getRandomBlock(level),
      getRandomBlock(level),
      getRandomBlock(level),
    ];
    setScore(0);
    setUpcomingBlocks(startingBlocks);
    setIsCommitting(false);
    setIsPlaying(true);
    setTickSpeed(TickSpeed.Normal);
    dispatchBoardState({ type: 'start', level:level });
  }, [dispatchBoardState]);

  // Función para confirmar la posición de la pieza en caída
  const commitPosition = useCallback(() => {
    if (!hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)) {
      setIsCommitting(false);
      setTickSpeed(TickSpeed.Normal);
      return;
    }

    const newBoard = structuredClone(board) as BoardShape;
    addShapeToBoard(
      newBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );

    let numCleared = 0;
    for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
      if (newBoard[row].every((entry) => entry !== EmptyCell.Empty)) {
        numCleared++;
        newBoard.splice(row, 1);
      }
    }

    const newUpcomingBlocks = structuredClone(upcomingBlocks) as Block[];
    const newBlock = newUpcomingBlocks.pop() as Block;
    newUpcomingBlocks.unshift(getRandomBlock(level));

    if (hasCollisions(board, SHAPES[newBlock].shape, 0, 3)) {
      setIsPlaying(false);
      setTickSpeed(null);
    } else {
      setTickSpeed(TickSpeed.Normal);
    }
    setUpcomingBlocks(newUpcomingBlocks);
    setScore((prevScore) => prevScore + getPoints(numCleared));
    dispatchBoardState({
      type: 'commit',
      newBoard: [...getEmptyBoard(BOARD_HEIGHT - newBoard.length), ...newBoard],
      newBlock,
    });
    setIsCommitting(false);
  }, [
    board,
    dispatchBoardState,
    droppingBlock,
    droppingColumn,
    droppingRow,
    droppingShape,
    upcomingBlocks,
  ]);

  // Función que maneja la lógica del tick del juego
  const gameTick = useCallback(() => {
    if (isCommitting) {
      commitPosition();
    } else if (
      hasCollisions(board, droppingShape, droppingRow + 1, droppingColumn)
    ) {
      setTickSpeed(TickSpeed.Sliding);
      setIsCommitting(true);
    } else {
      dispatchBoardState({ type: 'drop' });
    }
  }, [
    board,
    commitPosition,
    dispatchBoardState,
    droppingColumn,
    droppingRow,
    droppingShape,
    isCommitting,
  ]);

  // Configuración del intervalo para el tick del juego
  useInterval(() => {
    if (!isPlaying) {
      return;
    }
    gameTick();
  }, tickSpeed);

  // Efecto que maneja la entrada del teclado
  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let isPressingLeft = false;
    let isPressingRight = false;
    let moveIntervalID: number | undefined;

    const updateMovementInterval = () => {
      clearInterval(moveIntervalID);
      dispatchBoardState({
        type: 'move',
        isPressingLeft,
        isPressingRight,
      });
      moveIntervalID = setInterval(() => {
        dispatchBoardState({
          type: 'move',
          isPressingLeft,
          isPressingRight,
        });
      }, 300);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) {
        return;
      }

      if (event.key === 'ArrowDown') {
        setTickSpeed(TickSpeed.Fast);
      }

      if (event.key === 'ArrowUp') {
        dispatchBoardState({
          type: 'move',
          isRotating: true,
        });
      }

      if (event.key === 'ArrowLeft') {
        isPressingLeft = true;
        updateMovementInterval();
      }

      if (event.key === 'ArrowRight') {
        isPressingRight = true;
        updateMovementInterval();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setTickSpeed(TickSpeed.Normal);
      }

      if (event.key === 'ArrowLeft') {
        isPressingLeft = false;
        updateMovementInterval();
      }

      if (event.key === 'ArrowRight') {
        isPressingRight = false;
        updateMovementInterval();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      clearInterval(moveIntervalID);
      setTickSpeed(TickSpeed.Normal);
    };
  }, [dispatchBoardState, isPlaying]);

  // Crear una copia estructurada del tablero para representar la pieza en caída
  const renderedBoard = structuredClone(board) as BoardShape;
  if (isPlaying) {
    addShapeToBoard(
      renderedBoard,
      droppingBlock,
      droppingShape,
      droppingRow,
      droppingColumn
    );
  }

  // Devolver el estado del juego y funciones asociadas
  return {
    board: renderedBoard,
    startGame,
    isPlaying,
    score,
    upcomingBlocks,
    handleButtonLeft,
    handleButtonRight,
    handleButtonRotate,
    handleButtonFast,
  };
};


// Función para obtener los puntos según el número de filas eliminadas
const getPoints = (numCleared: number): number => {
  switch (numCleared) {
    case 0:
      return 0;
    case 1:
      return 100;
    case 2:
      return 300;
    case 3:
      return 500;
    case 4:
      return 800;
    default:
      throw new Error('Unexpected number of rows cleared');
  }
};

// Función para agregar la forma de la pieza al tablero
const addShapeToBoard = (
  board: BoardShape,
  droppingBlock: Block,
  droppingShape: BlockShape,
  droppingRow: number,
  droppingColumn: number
) => {
  droppingShape
    .filter((row) => row.some((isSet) => isSet))
    .forEach((row: boolean[], rowIndex: number) => {
      row.forEach((isSet: boolean, colIndex: number) => {
        if (isSet) {
          board[droppingRow + rowIndex][droppingColumn + colIndex] =
            droppingBlock;
        }
      });
    });
};

export default useTetris;