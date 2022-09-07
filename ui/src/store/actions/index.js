import { clearError } from './clearError';
import { resetState } from './resetState';
import { setCountries } from './setCountries';
import { setCountry } from './setCountry';
import { setError } from './setError';
import { setFieldsSchema } from './setFieldsSchema';
import { setPublicKey } from './setPublicKey';
import { setRedirectUrl } from './setRedirectUrl';
import { setSession } from './setSession';

export const actions = {
  setPublicKey,
  setRedirectUrl,
  setError,
  setSession,
  setCountries,
  setCountry,
  setFieldsSchema,
  resetState,
  clearError,
};
