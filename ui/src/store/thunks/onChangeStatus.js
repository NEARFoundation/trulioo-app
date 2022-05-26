import { thunk } from 'easy-peasy';

export const onChangeStatus = thunk(async (actions, payload) => {
  try {
    const setStatus = actions.setStatus;
    setStatus(payload);
    document.location.reload();
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
