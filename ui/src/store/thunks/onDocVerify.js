// eslint-disable-next-line unicorn/prevent-abbreviations
import { thunk } from 'easy-peasy';

import { api } from '../../config/api';

// eslint-disable-next-line unicorn/prevent-abbreviations
export const onDocVerify = thunk(async (actions, payload, { getStoreState }) => {
  const state = getStoreState();
  const onGetSession = actions.onGetSession;
  try {
    const pathname = window.location.pathname;
    // eslint-disable-next-line canonical/id-match
    const session_id = state.general.session[pathname]?.session_id || '';
    const body = payload;
    // eslint-disable-next-line canonical/id-match
    body.session_id = session_id;
    await api.requestDocVerify(body);
    await onGetSession();
  } catch (error) {
    console.log(`Error:${error}`);
  }
});
