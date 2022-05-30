import { thunk } from 'easy-peasy';

export const onInitApp = thunk(async (actions, payload, { getStoreState }) => {
  try {
    const pathname = window.location.pathname;
    const { setInit } = payload;
    const onGetSession = actions.onGetSession;
    const resetState = actions.resetState;
    const state = getStoreState();
    const pathCode = state.general.session.pathname;
    if (pathname !== pathCode) resetState();
    await onGetSession();
    setInit(true);
  } catch (e) {
    console.log(`Error onInit App:${e}`);
  }
});
