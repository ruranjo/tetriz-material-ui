//import './Menu.scss'
import { Box, Button, List, ListItem, SxProps, Typography } from '@mui/material'

interface Props {
    menuOptions: string[];
    changeOption: (opction:string)=>void;
}

export interface AppType {
    mainContainer: SxProps,
    header: SxProps,
}
  
export const appStyle: AppType = {
    mainContainer:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5rem',
    },
    header:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      
    }
    
}


const Menu: React.FC<Props> = ({menuOptions, changeOption}) => {
  return (
    <Box sx={appStyle.mainContainer}>
          
          <Box sx={appStyle.header} >
            <Typography variant='h2' sx={{color:'white', fontFamily:"'Bebas Neue', sans-serif", alignItems:"center"}}  className='menu-logo'>TETRIZ GAME</Typography>
            <Typography variant='h6' sx={{color:'white', fontFamily:"'Bebas Neue', sans-serif", alignItems:"center"}}  className='menu-logo'>by RURANJO</Typography>
          </Box>

          <List component="nav">
            {
                menuOptions.map((option, index) => { 
                   return (
                    <ListItem button key = {index} onClick={() => changeOption(option)} >    
                        {
                            option !== "main" && <Button className='text-font' sx={{ alignItems:"center", width:200, fontFamily:"'Bebas Neue', sans-serif", fontSize:"2rem", backgroundColor:"#545454", '&.MuiButton-root:hover':{bgcolor: '#545454'} }} variant='contained'>{option}</Button>
                        }
                    </ListItem>
                    )})
            }
          </List>
    </Box>
      
  )
}

export default Menu

/*

.menu-container{
    
} 
    

*/