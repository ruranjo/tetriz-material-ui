import { createTheme } from "@mui/material";
import { bgMain } from "../styles/global";

const theme = createTheme({
    palette: {
      background: {
        default: bgMain, // Color de fondo personalizado
      },
    },
});

export default theme;