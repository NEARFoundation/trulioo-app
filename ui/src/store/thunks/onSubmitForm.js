// TODO Enable consistent-return rule and fix the function.
import { thunk } from 'easy-peasy';

import { api } from '../../config/api';
import { getFields } from '../helpers/getFields';

const onError = async ({ actions, error }) => {
  const setError = actions.general.setError;
  const onGetSession = actions.general.onGetSession;
  setError({ isError: true, description: error });
  await onGetSession();
};

// eslint-disable-next-line consistent-return
export const onSubmitForm = thunk(async (_, { formData, setSubmitLoading }, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  const { onChangeStatus, setError } = actions.general;
  try {
    setSubmitLoading(true);
    const pathname = window.location.pathname;
    const formClone = getFields.deepCopy(formData);
    const truliooFormData = getFields.parseTruliooFields(formClone);
    const body = getFields.getSubmitBody(truliooFormData);
    // eslint-disable-next-line canonical/id-match
    body.session_id = state.general.session[pathname]?.session_id || '';
    const { status, error } = await api.requestSubmitForm(body);
    if (error) {
      console.error(`Error`, error);
      return await onError({ actions, error });
    }

    onChangeStatus({ status });
  } catch (error) {
    console.error(`Error`, error);
    setError({ isAppError: true, description: `${error}` });
  } finally {
    setSubmitLoading(false);
  }
});
