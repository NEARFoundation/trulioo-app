import ky from 'ky';

const headers = {
  'content-type': 'application/json',
};

const requestAppParameters = async () => {
  return ky
    .get(`api/get-parameters`, {
      headers,
      timeout: 60_000,
    })
    .json();
};

const requestSession = async (body) => {
  return ky
    .post('api/session', {
      headers,
      json: { ...body },
      timeout: 60_000,
      throwHttpErrors: false,
    })
    .json();
};

const requestCountries = async () => {
  const response = await ky
    .get('api/get-countries', {
      headers,
      timeout: 60_000,
    })
    .json();
  return response.sort();
};

const requestFields = async (countryCode) => {
  return ky
    .get(`api/get-fields?country=${countryCode}`, {
      headers,
      timeout: 60_000,
    })
    .json();
};

const requestConsents = async (countryCode) => {
  return ky
    .get(`api/get-consents?country=${countryCode}`, {
      headers,
      timeout: 60_000,
    })
    .json();
};

const requestSubdivisions = async (countryCode) => {
  return ky
    .get(`api/get-country-subdivisions?country=${countryCode}`, {
      headers,
      timeout: 60_000,
    })
    .json();
};

const requestSubmitForm = async (body) => {
  return ky
    .post('api/verify', {
      headers,
      json: { ...body },
      timeout: 60_000,
      throwHttpErrors: false,
    })
    .json();
};

const sendCheckResult = async () => {
  return ky
    .post('api/send-check-result', {
      headers,
      json: {},
      timeout: 60_000,
    })
    .json();
};

const requestDocumentVerify = async (body) => {
  return ky
    .post('api/doc-verify', {
      headers,
      json: { ...body },
      timeout: 60_000,
    })
    .json();
};

export const api = {
  requestAppParams: requestAppParameters,
  requestFields,
  requestConsents,
  requestSession,
  sendCheckResult,
  requestCountries,
  requestSubdivisions,
  requestSubmitForm,
  requestDocVerify: requestDocumentVerify,
};
