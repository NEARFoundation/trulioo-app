import { thunk } from 'easy-peasy';
import { api } from '../../config/api';

export const onGetSession = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  try {
    const state = getStoreState();
    const actions = getStoreActions();
    const setSession = actions.general.setSession;
    const session_id = state.general.session.session_id;
    const session = await api.requestSession(session_id);
    setSession(session);
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
