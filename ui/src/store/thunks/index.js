import { onInitApp } from './onInitApp';
import { onChangeStatus } from './onChangeStatus';
import { onGetFields } from './onGetFields';
import { onGetSession } from './onGetSession';
import { onSubmitForm } from './onSubmitForm';
import { onGetCountries } from './onGetCountries';

export const thunks = {
  onInitApp,
  onGetCountries,
  onChangeStatus,
  onGetFields,
  onGetSession,
  onSubmitForm,
};
