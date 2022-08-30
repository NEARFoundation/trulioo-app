import { thunk } from 'easy-peasy';

import { api } from '../../config/api';

export const onDocVerify = thunk(async (actions, payload, { getStoreState }) => {
  const state = getStoreState();
  const onGetSession = actions.onGetSession;
  try {
    const pathname = window.location.pathname;
    const session_id = state.general.session[pathname]?.session_id || '';
    const body = payload;
    body.session_id = session_id;
    await api.requestDocVerify(body);
    await onGetSession();
  } catch (error) {
    console.log(`Error:${error}`);
  }
});
