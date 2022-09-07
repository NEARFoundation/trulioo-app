import { action } from 'easy-peasy';

export const setRedirectUrl = action((state, payload) => {
  // eslint-disable-next-line canonical/id-match
  state.appConfig.finish_redirect_url = payload;
});
