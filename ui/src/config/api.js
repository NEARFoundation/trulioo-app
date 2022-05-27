import ky from 'ky';

const headers = {
  'content-type': 'application/json',
};

const requestSession = async (session_id) => {
  return ky
    .post('api/session', {
      headers,
      json: { session_id },
      timeout: 60000,
    })
    .json();
};

const requestCountries = async () => {
  const response = await ky
    .get('api/get-countries', {
      headers,
      timeout: 60000,
    })
    .json();
  return response.sort();
};

const requestFields = async (countryCode) => {
  return ky
    .get(`api/get-fields?country=${countryCode}`, {
      headers,
      timeout: 60000,
    })
    .json();
};

const requestConsents = async (countryCode) => {
  return ky
    .get(`api/get-consents?country=${countryCode}`, {
      headers,
      timeout: 60000,
    })
    .json();
};

const requestSubdivisions = async (countryCode) => {
  return ky
    .get(`api/get-country-subdivisions?country=${countryCode}`, {
      headers,
      timeout: 60000,
    })
    .json();
};

const requestSubmitForm = async (body) => {
  return ky
    .post('api/verify', {
      headers,
      json: { ...body },
      timeout: 60000,
    })
    .json();
};

export const api = {
  requestFields,
  requestConsents,
  requestSession,
  requestCountries,
  requestSubdivisions,
  requestSubmitForm,
};
