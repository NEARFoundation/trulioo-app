import { thunk } from 'easy-peasy';

export const onInitApp = thunk(async (actions, payload) => {
  try {
    const onGetSession = actions.onGetSession;
    const { setInit } = payload;
    await onGetSession();
    setInit(true);
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
