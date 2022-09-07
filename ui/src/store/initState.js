import { persist } from 'easy-peasy';

// eslint-disable-next-line canonical/id-match
const _initState = {
  isLoading: false,
  error: {
    isAppError: false,
    isError: false,
    description: '',
  },
  appConfig: {
    trulioo_public_key: null,
    finish_redirect_url: null,
  },
  session: {},
  country: null,
  countries: [],
  getFields: null,
  isRejected: false,
  messages: null,
};

export const initState = persist(_initState, {
  storage: 'localStorage',
});
