import { thunk } from 'easy-peasy';

export const onInitApp = thunk(async (actions, payload) => {
  try {
    const { setInit } = payload;
    const { onGetSession, clearError } = actions;
    clearError();
    await onGetSession();
    setInit(true);
  } catch (error) {
    console.log(`Error onInit App:${error}`);
  }
});
