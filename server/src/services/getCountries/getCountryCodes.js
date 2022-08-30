import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { hoursDifference } from "../../helpers/hoursDifference.js";
import { cacheExpirationPeriod, Countries } from "../../models/Countries.js";

export const getCountryCodes = async (request, res) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(res);
    }

    let countriesRecord = await Countries.findOne({});
    if (countriesRecord && hoursDifference(new Date(), countriesRecord.timestamp) < cacheExpirationPeriod) {
      res.send(countriesRecord.countries);
    } else {
      const countries = await getCountriesFromTrulioo(request.app.get('trulioo'));
      if (!countriesRecord) {
        countriesRecord = new Countries({});
      }

      countriesRecord.countries = countries;
      countriesRecord.timestamp = new Date();
      countriesRecord.save();
      res.send(countries);
    }

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: 'The list of countries cannot be obtained. Please try again.' });
  }
}

async function getCountriesFromTrulioo(truliooInstance) {
  const response = await truliooInstance.get(`/configuration/v1/countrycodes/Identity%20Verification`);
  return response.data;
}
