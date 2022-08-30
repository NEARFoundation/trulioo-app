import { thunk } from 'easy-peasy';

import { api } from '../../config/api';

export const onGetAppConfig = thunk(async (actions) => {
  try {
    const { setPublicKey, setRedirectUrl } = actions;
    const { trulioo_public_key, finish_redirect_url } = await api.requestAppParams();
    setPublicKey(trulioo_public_key);
    setRedirectUrl(finish_redirect_url);
  } catch (error) {
    console.log(`Error get appConfig:${error}`);
  }
});
