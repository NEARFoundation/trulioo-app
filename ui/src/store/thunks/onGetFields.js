import { thunk } from 'easy-peasy';
import { api } from '../../config/api';

export const onGetFields = thunk(async (actions, payload) => {
  try {
    const setFieldsSchema = actions.setFieldsSchema;
    const fields = await api.requestFields('UA');
    setFieldsSchema(fields);
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
