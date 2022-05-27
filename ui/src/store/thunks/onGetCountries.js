import { thunk } from 'easy-peasy';
import { api } from '../../config/api';
import { localeCountriesArr } from '../helpers/helpers';

export const onGetCountries = thunk(async (actions) => {
  try {
    const setCountries = actions.setCountries;
    const response = await api.requestCountries();
    const countries = localeCountriesArr.filter((v) => response.some((e) => e === v.code));
    setCountries({ countries });
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
