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
  try {
    const session_id = state.general.session.session_id;
    const session = await api.requestSession({ session_id, ...payload });
    setSession(session);
  } catch (error) {
    console.log(`Error:${error}`);
    await onError({ actions });
  }
});
