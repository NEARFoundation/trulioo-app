import { checkCode, invalidCode } from '../../helpers/codeUtils';
import { hoursDifference } from '../../helpers/hoursDifference';
import { cacheExpirationPeriod, CountrySubdivisions } from '../../models/CountrySubdivisions';

export const getCountrySubdivisions = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    const { country } = request.query;
    let countrySubdivisionsRecord = await CountrySubdivisions.findOne({ country });
    if (countrySubdivisionsRecord && hoursDifference(new Date(), countrySubdivisionsRecord.timestamp) < cacheExpirationPeriod) {
      response.send(countrySubdivisionsRecord.countrySubdivisions);
    } else {
      const countrySubdivisions = await getCountrySubdivisionsFromTrulioo(country, request.app.get('trulioo'));
      if (!countrySubdivisionsRecord) {
        countrySubdivisionsRecord = new CountrySubdivisions({ country });
      }

      countrySubdivisionsRecord.countrySubdivisions = countrySubdivisions;
      countrySubdivisionsRecord.timestamp = new Date();
      countrySubdivisionsRecord.save();
      response.send(countrySubdivisions);
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'The list of subdivisions cannot be obtained. Please try again.' });
  }
};

async function getCountrySubdivisionsFromTrulioo(country, truliooInstance) {
  const response = await truliooInstance.get(`/configuration/v1/countrysubdivisions/${country}`);
  return response.data;
}
