import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#77B5FE', 
    },
    secondary: {
      main: '#FF6F61', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', 
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', 
          borderRadius: 8, 
        },
      },
    },
  },
});

export default theme;
