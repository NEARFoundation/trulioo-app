/* eslint-disable react/react-in-jsx-scope */
import { Box, Container } from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';

import Loader from '../../general/Loader/Loader';

const TruliooEmbedId = ({ publicKey }) => {
  const [loading, setLoading] = useState(true);
  const { onDocVerify } = useStoreActions((actions) => actions.general);

  const handleResponse = (e) => {
    onDocVerify(e);
  };

  const onInitialRenderComplete = (e) => {
    if (e.status === 200) {
      setLoading(false);
    }
  };

  const scriptLoaded = (publicKey) => {
    new window.TruliooClient({
      publicKey,
      accessTokenURL: `${window.location.pathname.slice(0, Math.max(0, window.location.pathname.length - 1))}`,
      handleResponse,
      onInitialRenderComplete,
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    if (publicKey) {
      script.src = 'https://js.trulioo.com/latest/main.js';
      script.async = true;
      script.onload = () => scriptLoaded(publicKey);
      document.body.appendChild(script);
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Box sx={{ width: '100%' }}>
        <Container>
          <div id="trulioo-embedid" />
        </Container>
      </Box>
    </>
  );
};

export default TruliooEmbedId;
