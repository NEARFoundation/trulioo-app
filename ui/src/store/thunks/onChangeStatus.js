import { thunk } from 'easy-peasy';

export const onChangeStatus = thunk(async (actions, payload) => {
  try {
    const setSession = actions.setSession;
    setSession(payload);
  } catch (error) {
    console.log(`Error:${error}`);
  }
});
