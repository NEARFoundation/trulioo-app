import { thunk } from 'easy-peasy';
import { api } from '../../config/api';
import { getFields } from '../helpers/getFields';

export const onSubmitForm = thunk(async (_, form, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  try {
    const onChangeStatus = actions.general.onChangeStatus;
    const formClone = getFields.deepCopy(form);
    const truliooFormData = getFields.parseTruliooFields(formClone);
    const body = getFields.getSubmitBody(truliooFormData);
    body.session_id = state.general.session.session_id;
    const { status } = await api.requestSubmitForm(body);
    onChangeStatus({ status });
  } catch (e) {
    console.log(`Error:${e}`);
  }
});
