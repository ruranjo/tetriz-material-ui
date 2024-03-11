import React, { useState, useEffect } from 'react';
import { Box, SxProps } from '@mui/material';
import { fontFamily } from './styles/global';
import { Game } from './components/Game';
import { Menu } from './components';

export interface AppType {
  mainContainer: SxProps;
  title: SxProps;
  subtitle: SxProps;
}

export const appStyle: AppType = {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '0rem',
    '@media screen and (max-width: 1000px)': {
      fontSize: '3rem',
    },
  },
  title: {
    fontFamily: fontFamily,
    fontWeight: 600,
    maxWidth: '450px',
    letterSpacing: '5px',
    color: 'white',
    '@media screen and (max-width: 1000px)': {
      fontSize: '3rem',
    },
  },
  subtitle: {
    fontFamily: fontFamily,
    maxWidth: '450px',
    letterSpacing: '5px',
    color: 'white',
    '@media screen and (max-width: 1000px)': {
      marginTop: '2rem',
      marginBottom: '2rem',
    },
  },
};

const App: React.FC<{}> = () => {
  const [level, setLevel] = useState<number>(2);
  const [showGame, setShowGame] = useState<boolean>(false);
  const MAIN = 'main';
  const NIVEL1 = 'NIVEL1';
  const NIVEL2 = 'NIVEL2';
  const NIVEL3 = 'NIVEL3';
  const menuOptions = [MAIN, NIVEL1, NIVEL2, NIVEL3];
  const [selectedOption, setSelectedOption] = useState<string>('main');

  const changeOption = (option: string): void => {
    // Actualiza el estado level solo cuando se selecciona una opción diferente de 'main'
    if (option !== MAIN) {
      switch (option) {
        case NIVEL1:
          setLevel(1);
          break;
        case NIVEL2:
          setLevel(2);
          break;
        case NIVEL3:
          setLevel(3);
          break;
        default:
          break;
      }

      // Muestra el componente Game después de actualizar el nivel
      setShowGame(true);
    } else {
      // Si es 'main', reinicia el estado showGame
      setShowGame(false);
    }

    // Actualiza la opción seleccionada
    setSelectedOption(option);
  };

  return (
    <Box sx={appStyle.mainContainer}>
      {selectedOption === MAIN && !showGame ? (
        <Menu menuOptions={menuOptions} changeOption={changeOption} />
      ) : null}
      {showGame && <Game level={level} changeOption={changeOption} />}
    </Box>
  );
};

export default App;