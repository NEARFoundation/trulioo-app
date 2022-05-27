import { thunk } from 'easy-peasy';
import { api } from '../../config/api';

const onError = async ({ actions }) => {
  const resetState = actions.general.resetState;
  window.localStorage.clear();
  resetState();
};

export const onGetSession = thunk(async (_, payload, { getStoreActions }) => {
  const actions = getStoreActions();
  const setSession = actions.general.setSession;
  try {
    const session = await api.requestSession(payload);
    setSession(session);
  } catch (error) {
    console.log(`Error:${error}`);
    await onError({ actions });
  }
});
