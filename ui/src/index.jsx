import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { colors } from '@mui/material';
import { Initializer } from './providers/Initializer/Initializer';
import { store } from './store';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './components/Dashboard/Dashboard';
import ProtectedRoute from './providers/ProtectedRoute/ProtectedRoute';
import Login from './components/Dashboard/Login/Login';
import Transactions from './components/Dashboard/Transactions/Transactions';
import TransactionDetails from './components/Dashboard/Transactions/TransactionDetails/TransactionDetails';
import TransactionsIndex from './components/Dashboard/Transactions/TransactionsIndex/TransactionsIndex';
import OneTimeUrls from './components/Dashboard/OneTimeURLs/OneTimeUrls';
import OneTimeUrlsIndex from './components/Dashboard/OneTimeURLs/OneTimeUrlsIndex/OneTimeUrlsIndex';
import OneTimeUrlsDetails from './components/Dashboard/OneTimeURLs/OneTimeUrlsDetails/OneTimeUrlsDetails';

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
          borderRadius: 12,
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
    MuiTextField: {
      defaultProps: { variant: 'filled', InputProps: { disableUnderline: true } },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          fontWeight: '600',
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.6)',
          '&::before': {
            width: '0px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: '700',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          fontWeight: '700',
          borderRadius: '12px',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider store={store}>
        <Initializer store={store}>
          <Router>
            <Routes>
              <Route path="/">
                <Route index path="/:key" element={<App />} />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute user={true}>
                      <DashBoard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Transactions />} />
                  <Route path="transactions" element={<Transactions />}>
                    <Route index element={<TransactionsIndex />} />
                    <Route path=":transactionId" element={<TransactionDetails />} />
                  </Route>
                  <Route path="one-time-urls" element={<OneTimeUrls />}>
                    <Route index element={<OneTimeUrlsIndex />} />
                    <Route path=":code" element={<OneTimeUrlsDetails />} />
                  </Route>
                </Route>
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </Router>
        </Initializer>
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
