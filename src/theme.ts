import { createTheme } from "@mui/material/styles";
import {teal, purple} from '@mui/material/colors/'

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: teal[400],
      contrastText: 'white',
    },
    secondary: {
      main: purple[400],
      contrastText: 'white',
    },
  },
});