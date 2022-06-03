import { action } from 'easy-peasy';

export const clearError = action((state) => {
  state.error = {
    isAppError: false,
    isError: false,
    description: '',
  };
});
