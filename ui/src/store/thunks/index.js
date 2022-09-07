import { onChangeStatus } from './onChangeStatus';
// eslint-disable-next-line unicorn/prevent-abbreviations
import { onDocVerify } from './onDocVerify';
import { onGetAppConfig } from './onGetAppConfig';
import { onGetCountries } from './onGetCountries';
import { onGetFields } from './onGetFields';
import { onGetSession } from './onGetSession';
import { onInitApp } from './onInitApp';
import { onSubmitForm } from './onSubmitForm';

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
