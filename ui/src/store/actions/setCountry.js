import { action } from 'easy-peasy';

export const setCountry = action((state, payload) => {
  state.country = payload;
});
