import express from "express";
import { createSession } from "../services/createSession/createSession.js";
import { getCountryCodes } from "../services/getCountries/getCountryCodes.js";
import { getFields } from "../services/getFields/getFields.js";
import { getConsents } from "../services/getConsents/getConsents.js";
import { getCountrySubdivisions } from "../services/getCountrySubdivisions/getCountrySubdivisions.js";
import { identityVerify } from "../services/identityVerify/identityVerify.js";
import { sendCheckResult } from "../services/sendCheckResult/sendCheckResult.js";
import { testAuthentication } from "../services/testAuthentication/testAuthentication.js";

export const routes = app => {
  app.get('/:code/api/test-authentication', testAuthentication);
  app.get('/:code/api/get-countries', getCountryCodes);
  app.get('/:code/api/get-fields', getFields);
  app.get('/:code/api/get-consents', getConsents);
  app.get('/:code/api/get-country-subdivisions', getCountrySubdivisions);
  app.post('/:code/api/session', createSession);
  app.post('/:code/api/verify', identityVerify);
  app.post('/api/send-check-result', sendCheckResult);
  app.use('/:code/', express.static('public'));
}
