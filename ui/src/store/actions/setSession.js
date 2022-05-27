import { action } from 'easy-peasy';

export const setSession = action((state, payload) => {
  state.session = { ...state.session, ...payload };
});
