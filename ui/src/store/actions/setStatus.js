import { action } from 'easy-peasy';

export const setStatus = action((state, payload) => {
  state.status = payload;
});
