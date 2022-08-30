import { thunk } from 'easy-peasy';

import { api } from '../../config/api';

export const onGetSession = thunk(async (_, payload, { getStoreActions, getStoreState }) => {
  const actions = getStoreActions();
  const state = getStoreState();
  const setSession = actions.general.setSession;
  const setError = actions.general.setError;
  try {
    const pathname = window.location.pathname;
    const session_id = state.general.session[pathname]?.session_id || '';
    const session = await api.requestSession({ session_id, ...payload });
    if (session.error) return setError({ isAppError: true, description: session.error });
    setSession(session);
  } catch (error) {
    console.log(`Error: ${error}`);
    setError({ isAppError: true, description: `${error}` });
  }
});
