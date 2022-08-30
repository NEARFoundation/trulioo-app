import { action } from 'easy-peasy';

export const setPublicKey = action((state, payload) => {
  // eslint-disable-next-line canonical/id-match
  state.appConfig.trulioo_public_key = payload;
});
