import { action } from 'easy-peasy';

export const setCountries = action((state, payload) => {
  state.countries = payload;
});
