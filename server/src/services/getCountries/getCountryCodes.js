/* eslint-disable import/extensions */
import { checkCode, invalidCode } from '../../helpers/codeUtils.js';
import { hoursDifference } from '../../helpers/hoursDifference.js';
import { cacheExpirationPeriod, Countries } from '../../models/Countries.js';

export const getCountryCodes = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    let countriesRecord = await Countries.findOne({});
    if (countriesRecord && hoursDifference(new Date(), countriesRecord.timestamp) < cacheExpirationPeriod) {
      response.send(countriesRecord.countries);
    } else {
      const countries = await getCountriesFromTrulioo(request.app.get('trulioo'));
      if (!countriesRecord) {
        countriesRecord = new Countries({});
      }

      countriesRecord.countries = countries;
      countriesRecord.timestamp = new Date();
      countriesRecord.save();
      response.send(countries);
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'The list of countries cannot be obtained. Please try again.' });
  }
};

async function getCountriesFromTrulioo(truliooInstance) {
  const response = await truliooInstance.get(`/configuration/v1/countrycodes/Identity%20Verification`);
  return response.data;
}
