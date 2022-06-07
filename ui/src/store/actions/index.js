import { setCountry } from './setCountry';
import { setFieldsSchema } from './setFieldsSchema';
import { setSession } from './setSession';
import { setCountries } from './setCountries';
import { resetState } from './resetState';
import { setError } from './setError';
import { clearError } from './clearError';
import { setPublicKey } from './setPublicKey';
import { setRedirectUrl } from './setRedirectUrl';

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
