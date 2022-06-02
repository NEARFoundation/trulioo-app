import { useEffect, useState } from 'react';
import Loader from '../../general/Loader/Loader';
import { useStoreActions } from 'easy-peasy';

const PUBLIC_KEY = process.env.REACT_APP_TRULIOO_PUBLIC_KEY;

const TruliooEmbedId = () => {
  const [loading, setLoading] = useState(true);
  const onDocVerify = useStoreActions((actions) => actions.general.onDocVerify);
  const setError = useStoreActions((actions) => actions.general.setError);
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
      accessTokenURL: `${window.location.pathname.substring(
        0,
        window.location.pathname.length - 1,
      )}`,
      handleResponse,
      onInitialRenderComplete,
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    if (PUBLIC_KEY) {
      script.src = 'https://js.trulioo.com/latest/main.js';
      script.async = true;
      script.onload = () => scriptLoaded(PUBLIC_KEY);
      document.body.appendChild(script);
    } else {
      setError({ isError: true, description: 'The Trulioo public key must be defined.' });
    }
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div>
        <div id="trulioo-embedid" />
      </div>
    </>
  );
};

export default TruliooEmbedId;
