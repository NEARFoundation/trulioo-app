import { persist } from 'easy-peasy';

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
  session: {
    pathname: '',
    session_id: '',
    status: null,
  },
  country: null,
  countries: [],
  getFields: null,
  isRejected: false,
  messages: null,
};

export const initState = persist(_initState, {
  storage: 'localStorage',
});
