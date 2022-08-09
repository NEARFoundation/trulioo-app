import ky from 'ky';

const headers = {
  'content-type': 'application/json',
};

const requestAppParams = async () => {
  return ky
    .get(`api/get-parameters`, {
      headers,
      timeout: 60000,
    })
    .json();
};

const requestSession = async (body) => {
  return ky
    .post('api/session', {
      headers,
      json: { ...body },
      timeout: 60000,
      throwHttpErrors: false,
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
      throwHttpErrors: false,
    })
    .json();
};

const sendCheckResult = async () => {
  return ky
    .post('api/send-check-result', {
      headers,
      json: {},
      timeout: 60000,
    })
    .json();
};

const requestDocVerify = async (body) => {
  return ky
    .post('api/doc-verify', {
      headers,
      json: { ...body },
      timeout: 60000,
    })
    .json();
};

const requestTransactions = async () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          id: '62976633e092d0fa03b47249',
          transactionId: '6a73d9de-a74a-4b45-9771-b117e46f0d26',
          transactionRecordId: '20ab3dac-4d6c-9f00-58ac-7cfb0a12854d',
          transactionTimestamp: '1654089267504',
          processed: true,
        },
      ],
    });
  });
};

const requestOneTimeUrls = async () => {
  return new Promise((resolve) => {
    resolve({
      data: [
        {
          id: '628f26dc3db33bc068b59bda',
          code: 'ede6bf79b5314371aeda432558522369',
          codeTimestamp: 1653548764514,
          expiryDate: 1656140764441,
          enabled: true,
        },
      ],
    });
  });
};

export const api = {
  requestAppParams,
  requestFields,
  requestConsents,
  requestSession,
  sendCheckResult,
  requestCountries,
  requestSubdivisions,
  requestSubmitForm,
  requestDocVerify,
  requestTransactions,
  requestOneTimeUrls,
};
