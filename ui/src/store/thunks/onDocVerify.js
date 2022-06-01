import { thunk } from 'easy-peasy';
import { api } from '../../config/api';

export const onDocVerify = thunk(async (actions, payload, { getStoreState }) => {
  const state = getStoreState();
  const onGetSession = actions.onGetSession;
  try {
    const session_id = state.general.session.session_id;
    let body = payload;
    body.session_id = session_id;
    await api.requestDocVerify(body);
    await onGetSession();
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
