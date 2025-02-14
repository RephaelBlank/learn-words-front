import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline'; 
import ErrorBoundary from './ErrorBoundary.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
