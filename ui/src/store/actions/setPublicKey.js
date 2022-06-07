import { action } from 'easy-peasy';

export const setPublicKey = action((state, payload) => {
  state.appConfig.trulioo_public_key = payload;
});
