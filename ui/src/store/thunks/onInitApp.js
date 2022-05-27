import { thunk } from 'easy-peasy';

export const onInitApp = thunk(async (actions, payload, { getStoreState }) => {
  try {
    const { setInit } = payload;
    const onGetSession = actions.onGetSession;
    const state = getStoreState();
    const session_id = state.general.session.session_id;
    await onGetSession({ session_id });
    setInit(true);
  } catch (e) {
    console.log(`Error onInit App:${e}`);
  }
});
