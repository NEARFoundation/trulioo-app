import { action } from 'easy-peasy';

export const setAppConfig = action((state, payload) => {
  state.appConfig = payload;
});
