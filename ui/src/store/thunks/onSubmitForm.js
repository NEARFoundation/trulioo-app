import { thunk } from 'easy-peasy';
import { api } from '../../config/api';
import { helpers } from '../helpers/helpers';

export const onSubmitForm = thunk(async (_, form, { getStoreState }) => {
  try {
    const state = getStoreState();
    const formClone = helpers.deepCopy(form);
    const truliooFormData = helpers.parseTruliooFields(formClone);
    const body = helpers.getSubmitBody(truliooFormData);
    body.session_id = state.general.session.session_id;
    await api.requestSubmitForm(body);
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
