import { thunk } from 'easy-peasy';
import { api } from '../../config/api';
import { getFields } from '../helpers/getFields';

const onError = async ({ actions, error }) => {
  const setError = actions.general.setError;
  const onGetSession = actions.general.onGetSession;
  setError({ isError: true, description: error });
  await onGetSession();
};

export const onSubmitForm = thunk(
  async (_, { formData, setSubmitLoading }, { getStoreState, getStoreActions }) => {
    const state = getStoreState();
    const actions = getStoreActions();
    const { onChangeStatus, setError } = actions.general;
    try {
      setSubmitLoading(true);
      const pathname = window.location.pathname;
      const formClone = getFields.deepCopy(formData);
      const truliooFormData = getFields.parseTruliooFields(formClone);
      const body = getFields.getSubmitBody(truliooFormData);
      body.session_id = state.general.session[pathname]?.session_id || '';
      const { status, error } = await api.requestSubmitForm(body);
      if (error) return await onError({ actions, error });
      onChangeStatus({ status });
    } catch (error) {
      setError({ isAppError: true, description: `${error}` });
    } finally {
      setSubmitLoading(false);
    }
  },
);
