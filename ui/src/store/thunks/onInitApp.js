import { thunk } from 'easy-peasy';

export const onInitApp = thunk(async (_, payload) => {
  try {
    const { setInit } = payload;

    setInit(true);
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
