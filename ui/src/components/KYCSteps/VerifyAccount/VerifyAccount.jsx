import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

const VerifyAccount = () => {
  const { onGenerateSDKToken } = useStoreActions((actions) => actions.main);
  const onfidoToken = useStoreState((state) => state.main.onfido.sdk_token);

  useEffect(() => {
    if (!onfidoToken) {
      onGenerateSDKToken();
    }
  }, []);

  return <>{onfidoToken && <div>Loading...</div>}</>;
};

export default VerifyAccount;
