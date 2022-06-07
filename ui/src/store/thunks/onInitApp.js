import { thunk } from 'easy-peasy';

export const onInitApp = thunk(async (actions, payload, { getStoreState }) => {
  try {
    const pathname = window.location.pathname;
    const { setInit } = payload;
    const { onGetSession, resetState, clearError } = actions;
    const state = getStoreState();
    const pathCode = state.general.session.pathname;
    clearError();
    if (pathname !== pathCode) resetState();
    await onGetSession();
    setInit(true);
  } catch (e) {
    console.log(`Error onInit App:${e}`);
  }
});
