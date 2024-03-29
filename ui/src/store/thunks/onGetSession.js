// TODO Enable consistent-return rule and fix the function.
import { thunk } from 'easy-peasy';

import { api } from '../../config/api';

// eslint-disable-next-line consistent-return
export const onGetSession = thunk(async (_, payload, { getStoreActions, getStoreState }) => {
  const actions = getStoreActions();
  const state = getStoreState();
  const setSession = actions.general.setSession;
  const setError = actions.general.setError;
  try {
    const pathname = window.location.pathname;
    // eslint-disable-next-line canonical/id-match
    const session_id = state.general.session[pathname]?.session_id || '';
    const session = await api.requestSession({ session_id, ...payload });
    console.log({ session });
    if (session.error) {
      console.error(session.error);
      return setError({ isAppError: true, description: session.error });
    }

    setSession(session);
  } catch (error) {
    console.error(`Error: ${error}`);
    setError({ isAppError: true, description: `${error}` });
  }
});
