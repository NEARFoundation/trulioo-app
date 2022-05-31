import { thunk } from 'easy-peasy';

export const onChangeStatus = thunk(async (actions, payload) => {
  try {
    const setSession = actions.setSession;
    setSession(payload);
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
