/* eslint-disable react/react-in-jsx-scope */
import './App.css';
import Box from '@mui/material/Box';
import { useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppError from './components/AppError/AppError';
import CountrySelection from './components/CountrySelection/CountrySelection';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import KYCSteps from './components/KYCSteps/KYCSteps';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
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
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route
          path="*"
          element={
            isAppError ? (
              <AppError description={description} />
            ) : (
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
            )
          }
        />
      </Routes>
      {status !== 'country_select' && status !== steps.includes(status) && <Footer />}
      <Message />
    </Router>
  );
};

export default App;
