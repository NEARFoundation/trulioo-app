import { action } from 'easy-peasy';

export const setRedirectUrl = action((state, payload) => {
  state.appConfig.finish_redirect_url = payload;
});
