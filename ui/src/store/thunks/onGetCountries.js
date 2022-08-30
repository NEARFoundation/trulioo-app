import { thunk } from 'easy-peasy';

import { api } from '../../config/api';
import { localeCountriesArr as localeCountriesArray } from '../helpers/getFields';

export const onGetCountries = thunk(async (actions) => {
  try {
    const setCountries = actions.setCountries;
    const response = await api.requestCountries();
    const countries = localeCountriesArray.filter((v) => response.includes(v.code));
    setCountries(countries);
  } catch (error) {
    console.log(`Error:${error}`);
  }
});
