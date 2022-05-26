import { persist } from 'easy-peasy';

const _initState = {
  isLoading: false,
  error: {
    isError: false,
    description: '',
  },
  status: 'new',
  country: null,
  schema: null,
  isRejected: false,
  messages: null,
};

export const initState = persist(_initState, {
  storage: 'localStorage',
});
