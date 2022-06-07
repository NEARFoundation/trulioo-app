import { action } from 'easy-peasy';

export const setSession = action((state, payload) => {
  const pathname = window.location.pathname;
  state.session[pathname] = { ...state.session[pathname], ...payload };
});
