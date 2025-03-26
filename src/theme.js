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
          color: '#fff',
          '&:hover': {
            opacity: 0.9, // אפקט ריחוף עדין
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
          }),
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.secondary.main,
          }), 
        },
      ],
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF', // רקע לבן כמו כרטיס
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #ddd',
          '&:last-child': {
            borderBottom: 'none',
          },
          '&:hover': {
            backgroundColor: '#f0f8ff', // כחול בהיר עדין בריחוף
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1.2rem',
          fontWeight: 'bold',
          color: '#333',
        },
        secondary: {
          color: '#666',
        },
      },
    },
  },
});

export default theme;
