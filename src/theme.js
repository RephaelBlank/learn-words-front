import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // כחול מותאם
    },
    secondary: {
      main: '#dc004e', // אדום מותאם
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // גופן גלובלי
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
          textTransform: 'none', // ביטול אותיות גדולות
          borderRadius: 8, // כפתורים עגולים
        },
      },
    },
  },
});

export default theme;
