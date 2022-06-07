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
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  const [loading, setLoading] = useState(false);
  const pathname = window.location.pathname;
  const status = useStoreState((state) => state.general.session[pathname]?.status);
  const { trulioo_public_key, finish_redirect_url } = useStoreState(
    (state) => state.general.appConfig,
  );
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
          {steps.includes(status) && (
            <KYCSteps
              loading={loading}
              setLoading={setLoading}
              status={status}
              redirectUrl={finish_redirect_url}
              publicKey={trulioo_public_key}
            />
          )}
        </Box>
      ) : (
        <AppError description={description} />
      )}
      <Message />
    </Router>
  );
};

export default App;
