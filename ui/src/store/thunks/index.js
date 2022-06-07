import { onInitApp } from './onInitApp';
import { onChangeStatus } from './onChangeStatus';
import { onGetFields } from './onGetFields';
import { onGetSession } from './onGetSession';
import { onSubmitForm } from './onSubmitForm';
import { onGetCountries } from './onGetCountries';
import { onDocVerify } from './onDocVerify';
import { onGetAppConfig } from './onGetAppConfig';

export const thunks = {
  onGetAppConfig,
  onInitApp,
  onGetCountries,
  onChangeStatus,
  onGetFields,
  onGetSession,
  onSubmitForm,
  onDocVerify,
};
