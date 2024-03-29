/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Box, Container } from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';

import Loader from '../../general/Loader/Loader';

const TruliooEmbedId = ({ publicKey }) => {
  const [loading, setLoading] = useState(true);
  const { onDocVerify } = useStoreActions((actions) => actions.general);

  const handleResponse = (event) => {
    onDocVerify(event);
  };

  const onInitialRenderComplete = (event) => {
    if (event.status === 200) {
      setLoading(false);
    }
  };

  const scriptLoaded = (scriptLoadedPublicKey) => {
    // eslint-disable-next-line no-new
    new window.TruliooClient({
      publicKey: scriptLoadedPublicKey,
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
