import { thunk } from 'easy-peasy';

export const onInitApp = thunk(async (actions, payload) => {
  try {
    const { setInit } = payload;
    const onGetSession = actions.onGetSession;
    await onGetSession();
    setInit(true);
  } catch (e) {
    console.log(`Error onInit App:${e}`);
  }
});
