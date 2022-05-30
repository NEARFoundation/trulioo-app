import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Header from './components/Header/Header';
import Box from '@mui/material/Box';
import { useStoreState } from 'easy-peasy';
import CountrySelection from './components/CountrySelection/CountrySelection';
import KYCSteps from './components/KYCSteps/KYCSteps';
import { useState } from 'react';

const steps = [
  'identity_verification_in_progress',
  'identity_verification_failed',
  'identity_verification_completed',
  'document_verification_in_progress',
  'document_verification_failed',
  'document_verification_completed',
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const status = useStoreState((state) => state.general.session.status);

  return (
    <>
      <Header />
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
          <KYCSteps loading={loading} setLoading={setLoading} status={status} />
        )}
      </Box>
    </>
  );
};

export default App;
