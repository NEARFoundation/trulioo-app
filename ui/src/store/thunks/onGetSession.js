import { thunk } from 'easy-peasy';
import { api } from '../../config/api';

const onError = async ({ actions }) => {
  const resetState = actions.general.resetState;
  window.localStorage.clear();
  resetState();
};

export const onGetSession = thunk(async (_, payload, { getStoreActions, getStoreState }) => {
  const actions = getStoreActions();
  const state = getStoreState();
  const setSession = actions.general.setSession;
  const setError = actions.general.setError;
  try {
    const session_id = state.general.session.session_id;
    let session = await api.requestSession({ session_id, ...payload });
    if (session.error) return setError({ isError: true, description: session.error });
    session.pathname = window.location.pathname;
    //session.status = 'identity_verification_failed'; /*TODO: remove on prod*/
    setSession(session);
  } catch (error) {
    console.log(error);
    await onError({ actions });
  }
});
