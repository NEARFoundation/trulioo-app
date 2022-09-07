import { createStore, persist } from 'easy-peasy';

import { actions } from './actions';
import { initState } from './initState';
import { thunks } from './thunks';

export const general = persist(
  {
    ...initState,
    ...actions,
    ...thunks,
  },
  {
    storage: 'localStorage',
    allow: ['country', 'appConfig', 'countries', 'getFields', 'session', 'error'],
  },
);

export const store = createStore(
  {
    general,
  },
  {
    name: 'KYC Module',
  },
);
