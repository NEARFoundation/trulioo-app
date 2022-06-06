import express from "express";
import { createSession } from "../services/sessionService/sessionService.js";
import { documentVerificationStart } from "../services/documentVerificationStart/documentVerificationStart.js";
import { embedIdToken } from "../services/embedIdToken/embedIdToken.js";
import { getConsents } from "../services/getConsents/getConsents.js";
import { getCountryCodes } from "../services/getCountries/getCountryCodes.js";
import { getCountrySubdivisions } from "../services/getCountrySubdivisions/getCountrySubdivisions.js";
import { getFields } from "../services/getFields/getFields.js";
import { identityVerify } from "../services/identityVerify/identityVerify.js";
import { checkResult } from "../services/checkResult/checkResult.js";
import { testAuthentication } from "../services/testAuthentication/testAuthentication.js";

export const routes = app => {
  app.get('/:code/api/test-authentication', testAuthentication);
  app.get('/:code/api/get-countries', getCountryCodes);
  app.get('/:code/api/get-fields', getFields);
  app.get('/:code/api/get-consents', getConsents);
  app.get('/:code/api/get-country-subdivisions', getCountrySubdivisions);
  app.post('/:code/api/session', createSession);
  app.post('/:code/api/verify', identityVerify);
  app.post('/:code/api/send-check-result', checkResult);
  app.post('/:code/trulioo-api/embedids/tokens/:publicKey', embedIdToken);
  app.post('/:code/api/doc-verify', documentVerificationStart);
  app.use('/:code/', express.static('public'));
  app.get('*', function(req, res){
    res.redirect('/error/');
  });
}
