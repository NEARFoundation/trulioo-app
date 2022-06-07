import { thunk } from 'easy-peasy';
import { api } from '../../config/api';

export const onGetAppConfig = thunk(async (actions) => {
  try {
    const { setAppConfig } = actions;
    const appConfig = await api.requestAppParams();
    setAppConfig(appConfig);
  } catch (e) {
    console.log(`Error onInit App:${e}`);
  }
});
