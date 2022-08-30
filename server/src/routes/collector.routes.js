import express from 'express';

import { checkResult } from '../services/checkResult/checkResult';
import { documentVerificationStart } from '../services/documentVerificationStart/documentVerificationStart';
import { embedIdToken } from '../services/embedIdToken/embedIdToken';
import { getConsents } from '../services/getConsents/getConsents';
import { getCountryCodes } from '../services/getCountries/getCountryCodes';
import { getCountrySubdivisions } from '../services/getCountrySubdivisions/getCountrySubdivisions';
import { getFields } from '../services/getFields/getFields';
import { getParameters } from '../services/getParameters/getParameters';
import { identityVerify } from '../services/identityVerify/identityVerify';
import { createSession } from '../services/sessionService/sessionService';
import { testAuthentication } from '../services/testAuthentication/testAuthentication';

export const routes = (app) => {
  app.get('/:code/api/test-authentication', testAuthentication);
  app.get('/:code/api/get-countries', getCountryCodes);
  app.get('/:code/api/get-fields', getFields);
  app.get('/:code/api/get-consents', getConsents);
  app.get('/:code/api/get-country-subdivisions', getCountrySubdivisions);
  app.get('/:code/api/get-parameters', getParameters);
  app.post('/:code/api/session', createSession);
  app.post('/:code/api/verify', identityVerify);
  app.post('/:code/api/send-check-result', checkResult);
  app.post('/:code/trulioo-api/embedids/tokens/:publicKey', embedIdToken);
  app.post('/:code/api/doc-verify', documentVerificationStart);
  app.use('/:code/', express.static('public'));
  app.get('*', (request, response) => {
    response.redirect('/error/');
  });
};
