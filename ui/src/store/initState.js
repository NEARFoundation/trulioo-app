import { persist } from 'easy-peasy';

const _initState = {
  isLoading: false,
  error: {
    isError: false,
    description: '',
  },
  session: {
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
