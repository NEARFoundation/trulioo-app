import { action } from 'easy-peasy';

export const setError = action((state, payload) => {
  state.error = payload;
});
