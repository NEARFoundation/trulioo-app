import express from "express";
import { createSession } from "../services/createSession/createSession.js";
import { getCountryCodes } from "../services/getCountries/getCountryCodes.js";
import { getFields } from "../services/getFields/getFields.js";
import { getConsents } from "../services/getConsents/getConsents.js";

export const routes = app => {
  app.get('/:code/api/get-countries', getCountryCodes);
  app.get('/:code/api/get-fields', getFields);
  app.get('/:code/api/get-consents', getConsents);
  app.post('/:code/api/session', createSession);
  app.use('/:code/', express.static('public'));
}
