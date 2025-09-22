import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
// import { ThemeProvider } from '@mui/material/styles'
import App from './App.jsx'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
