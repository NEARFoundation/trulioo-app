import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Header from './components/Header/Header';
import Box from '@mui/material/Box';
import { useStoreState } from 'easy-peasy';
import CountrySelection from './components/CountrySelection/CountrySelection';
import KYCSteps from './components/KYCSteps/KYCSteps';
import { useState } from 'react';
import Message from './components/general/Message/Message';
import { steps } from './config/steps';
import AppError from './components/AppError/AppError';

const App = () => {
  const [loading, setLoading] = useState(false);
  const pathname = window.location.pathname;
  const status = useStoreState((state) => state.general.session[pathname]?.status);

  const { isAppError, description } = useStoreState((state) => state.general.error);

  return (
    <>
      <Header />
      {!isAppError ? (
        <Box
          id="main"
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
          {steps.includes(status) && (
            <KYCSteps loading={loading} setLoading={setLoading} status={status} />
          )}
        </Box>
      ) : (
        <AppError description={description} />
      )}
      <Message />
    </>
  );
};

export default App;
