/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Box from '@mui/material/Box';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppError from './components/AppError/AppError';
import CountrySelection from './components/CountrySelection/CountrySelection';
import Header from './components/Header/Header';
import KYCSteps from './components/KYCSteps/KYCSteps';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Message from './components/general/Message/Message';
import { steps } from './config/steps';

const App = () => {
  const [loading, setLoading] = useState(false);
  const pathname = window.location.pathname;
  const status = useStoreState((state) => state.general.session[pathname]?.status);

  const { isAppError, description } = useStoreState((state) => state.general.error);

  return (
    <Router>
      <Header />
      {!isAppError ? (
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f7f7f7',
          }}
        >
          {status === 'new' && <WelcomePage />}
          {status === 'country_select' && <CountrySelection setLoading={setLoading} />}
          {steps.includes(status) && <KYCSteps loading={loading} setLoading={setLoading} status={status} />}
        </Box>
      ) : (
        <AppError description={description} />
      )}
      <Message />
    </Router>
  );
};

export default App;
