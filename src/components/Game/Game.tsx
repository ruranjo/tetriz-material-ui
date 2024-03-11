import { Box, Button, SxProps, Typography } from "@mui/material";
import { fontFamily } from "../../styles/global";
import useTetris from "../../hooks/useTetriz/useTetriz";
import { Board, UpcomingBlocks } from "..";


export interface AppType {
  mainContainer: SxProps,
  title: SxProps,
  subtitle: SxProps,
  buttonGroupMovile: SxProps,
  displayMovile: SxProps,
  newGame: SxProps,
  gapFlex: SxProps,
}

export const appStyle: AppType = {
  mainContainer:{
    bordr:'1px solid white',
    display: 'grid',
    gridTemplateAreas:'". title ." ". game controls"',
    gridTemplateColumns: 'repeat(3, 1fr)',
    '@media screen and (max-width: 800px)': {
        display:'flex',
        flexDirection:'column',
      },
    },
    title:{
       //border:'1px solid tomato',
       fontFamily: fontFamily ,
       fontWeight:600,
       maxWidth:'450px',
       letterSpacing: '5px',
       color: 'white',
       '@media screen and (max-width: 800px)': {
         fontSize:'3rem',
       },
     },
     subtitle:{
      // border:'1px solid black',
       fontFamily: fontFamily,
       maxWidth:'450px',
       letterSpacing: '5px',
       color: 'white',
       '@media screen and (max-width: 800px)': {
        display:'none',
      },
       
     },
     buttonGroupMovile:{
        display:'none',
        
        
        '@media screen and (max-width: 800px)': {
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '2srem',
            gap:2
          },
     },
     displayMovile:{
        '@media screen and (max-width: 800px)': {
            display:'none',
          },
     },
     newGame:{
      display:'none',
        
        
        '@media screen and (max-width: 800px)': {
            display:'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap:2,
            justifyContent: 'center',
            marginTop: '0.5rem',
          },
   },
   gapFlex:{
            display:'flex',
            gap:2,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '0.5rem',
   }

  }

export interface Props {
    level: number,
    changeOption: (opction:string)=>void;}
  


const App:React.FC<Props> = ({level, changeOption}) => {

  const { board, 
      startGame, 
      isPlaying, 
      score, 
      upcomingBlocks,
      handleButtonLeft,
      handleButtonRight,
      handleButtonRotate,
      handleButtonFast

  } = useTetris(level);

  return (
    
      <>
      <Box sx={appStyle.mainContainer} >
        <Typography sx={appStyle.title} variant='h1' >Tetris</Typography>
        <Board currentBoard={board} />
        <Box className="controls">
          <Typography sx={appStyle.subtitle} variant='h2' >Score:{score}</Typography>
          {isPlaying ? (
            <Box sx={appStyle.displayMovile}>
                <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
            </Box>
          ) : (
            <>
            <Box sx={appStyle.displayMovile}>
                <Button className='text-font' sx={{ alignItems:"center", width:150, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={startGame}>New Game</Button>
                <Button className='text-font' sx={{ alignItems:"center", width:150, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={()=> changeOption('main')}>Menu</Button>
            </Box>
            <Box sx={appStyle.newGame}>
            <Button className='text-font' sx={{ alignItems:"center", width:150, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={startGame}>New Game</Button>
            <Button className='text-font' sx={{ alignItems:"center", width:150, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={()=> changeOption('main')}>Menu</Button>
            </Box>
            </>
          )}
        </Box>
      </Box>
      <Box sx={appStyle.buttonGroupMovile}>
        <Box sx={appStyle.gapFlex}>
            <Button className='text-font' sx={{ alignItems:"center", width:170, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={handleButtonRotate}>ROTATE</Button>
            <Button className='text-font' sx={{ alignItems:"center", width:170, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={handleButtonFast}>FAST</Button>
        </Box>
        <Box sx={appStyle.gapFlex}>
            <Button className='text-font' sx={{ alignItems:"center", width:170, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={handleButtonLeft}>LEFT</Button>
            <Button className='text-font' sx={{ alignItems:"center", width:170, fontFamily:"'Bebas Neue', sans-serif", fontSize:"1.5rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained' onClick={handleButtonRight}>RIGHT</Button>
        </Box>
      </Box>
      </>
  )
   
}

export default App
