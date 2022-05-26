import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import Header from './components/Header/Header';
import Box from '@mui/material/Box';
import { useStoreState } from 'easy-peasy';
import CountrySelection from './components/CountrySelection/CountrySelection';
import KYCSteps from './components/KYCSteps/KYCSteps';

const App = () => {
  console.log('App...');
  const status = useStoreState((state) => state.general.status);
  //console.log('status', status);

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
        {status === 'country_select' && <CountrySelection />}
        {status === 'identity_verification' && <KYCSteps status={status} />}
      </Box>
    </>
  );
};

export default App;
