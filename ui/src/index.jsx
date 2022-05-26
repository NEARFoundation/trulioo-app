import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@mui/material';
import { Initializer } from './providers/Initializer/Initializer';
import { store } from './store';
import { StoreProvider } from 'easy-peasy';

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  palette: {
    primary: {
      main: colors.deepPurple[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          '@media screen  and (max-width: 600px)': {
            minHeight: '56px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '@media screen  and (min-width: 601px)': {
            minHeight: '72px',
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Initializer store={store}>
          <App />
        </Initializer>
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
