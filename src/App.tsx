
import {  Menu } from './components';

import {Box, SxProps} from '@mui/material'
import { fontFamily } from './styles/global';
import { useState } from 'react';
import { Game } from './components/Game';


export interface AppType {
  mainContainer: SxProps,
  title: SxProps,
  subtitle: SxProps,
}

export const appStyle: AppType = {
  mainContainer:{
        
        display: 'flex',
        flexDirection: 'column',
        dsddddmarginTop: '5rem',
        '@media screen and (max-width: 1000px)': {
          fontSize:'3rem',
        },
    },
    title:{
      // border:'1px solid tomato',
       fontFamily: fontFamily,
       fontWeight:600,
       maxWidth:'450px',
       letterSpacing: '5px',
       color: 'white',
       '@media screen and (max-width: 1000px)': {
         fontSize:'3rem',
       },
     },
     subtitle:{
      // border:'1px solid black',
       fontFamily: fontFamily,
       maxWidth:'450px',
       letterSpacing: '5px',
       color: 'white',
       
       '@media screen and (max-width: 1000px)': {
         marginTop:'2rem',
         marginBottom:'2rem',
       },
       
     },
  }
  


const App:React.FC<{}> = () => {
  const [level,SetLevel]=useState<number>(1)

  const MAIN = "main";
  const NIVEL1 = "NIVEL1";
  const NIVEL2 = "NIVEL2";
  const NIVEL3 = "NIVEL3";
  

  const menuOptions = [MAIN,NIVEL1,NIVEL2,NIVEL3]
  const [selectedOpction, setSelectedOpction ] = useState<string>("main")

  const changeOption = (option: string) : void =>{
    setSelectedOpction(option)
    switch (selectedOpction) {
      case NIVEL1:
        SetLevel(1)
      break;

      case NIVEL2:
        SetLevel(2)
      break;

      case NIVEL3:
        SetLevel(3)
      break;
    
      default:
        break;
    }
  }


  return (
    <Box  sx={appStyle.mainContainer}>
    {

      selectedOpction === MAIN ? (<Menu menuOptions={menuOptions} changeOption = {changeOption} />)
      :
      <Game level={level} changeOption = {changeOption} />
      
    }
    </Box>

  );
}

export default App

/*


function App() {
 
}

export default App;
*/