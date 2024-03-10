export enum Block {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    T = 'T',
    Z = 'Z',
    U = 'U',
    H = 'H',
    P = 'P',
    Q = 'Q',
    K = 'K',
    X = 'X',
  }

  export enum BlockLevel1 {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    T = 'T',
    Z = 'Z',
  }

  export enum BlockLevel2 {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    T = 'T',
    Z = 'Z',

    P = 'P',
    Q = 'Q',
    K = 'K',
  }

  
  export enum BlockLevel3 {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    T = 'T',
    Z = 'Z',

    P = 'P',
    Q = 'Q',
    K = 'K',

    U = 'U',
    H = 'H',
    X = 'X',
  }

  export enum EmptyCell {
    Empty = 'Empty',
  }
  export enum HiddenCell {
    Empty = 'hidden',
  }
  
  export type CellOptions = Block | EmptyCell | HiddenCell;
  
  export type BoardShape = CellOptions[][];
  
  export type BlockShape = boolean[][];
  
  type ShapesObj = {
    [key in Block]: {
      shape: BlockShape;
    };
  };
  
  export const SHAPES: ShapesObj = {
    I: {
      shape: [
        [false, false, false, false],
        [false, false, false, false],
        [true, true, true, true],
        [false, false, false, false],
      ],
    },
    J: {
      shape: [
        [false, false, false],
        [true, false, false],
        [true, true, true],
      ],
    },
    L: {
      shape: [
        [false, false, false],
        [false, false, true],
        [true, true, true],
      ],
    },
    O: {
      shape: [
        [true, true],
        [true, true],
      ],
    },
    S: {
      shape: [
        [false, false, false],
        [false, true, true],
        [true, true, false],
      ],
    },
    T: {
      shape: [
        [false, false, false],
        [false, true, false],
        [true, true, true],
      ],
    },
    Z: {
      shape: [
        [false, false, false],
        [true, true, false],
        [false, true, true],
      ],
    },
    U: {
      shape: [
        [false, false, false],
        [true,  false, true],
        [true, true, true],
      ],
    },
    H: {
      shape: [
        [true, false, true],
        [true,  true, true],
        [true, false, true],
      ],
    },
    P: {
      shape: [
        [false, false, false],
        [true,  true, true],
        [false, false, false],
      ],
    },
    Q: {
      shape: [
        [true],
      ],
    },
    K: {
      shape: [
        [true, false],
        [true, true],
      ],
    },
    X: {
      shape: [
        [false, true, false],
        [true,  true, true],
        [false, true, false],
      ],
    },
  };

  export const cellColors = {
    //Empty: 'hsl(0, 0%, 78%)',
    Empty: 'hsl(0, 0%, 38%)',
    I: 'hsl(185, 71%, 62%)',
    J: 'hsl(222, 74%, 50%)',
    L: 'hsl(42, 74%, 55%)',
    O: 'hsl(58, 74%, 55%)',
    S: 'hsl(120, 60%, 52%)',
    T: 'hsl(120, 60%, 52%)',
    Z: 'hsl(0, 70%, 61%)',
    //NIVEL 2
    K: 'hsl(0, 100%, 50%)',
    Q: 'hsl(210, 80%, 50%)',
    P: 'hsl(45, 70%, 60%)',
    //NIVEL 3
    H: 'hsl(270, 100%, 50%)',
    U: 'hsl(120, 69%, 40%)',
    X: 'hsl(210, 100%, 40%)',
    
};







