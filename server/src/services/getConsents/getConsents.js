import { checkCode, invalidCode } from '../../helpers/codeUtils';
import { hoursDifference } from '../../helpers/hoursDifference';
import { cacheExpirationPeriod, Consents } from '../../models/Consents';

export const getConsents = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    const { country } = request.query;
    let consentsRecord = await Consents.findOne({ country });
    if (consentsRecord && hoursDifference(new Date(), consentsRecord.timestamp) < cacheExpirationPeriod) {
      response.send(consentsRecord.consents);
    } else {
      const consents = await getConsentsFromTrulioo(country, request.app.get('trulioo'));
      if (!consentsRecord) {
        consentsRecord = new Consents({ country });
      }

      consentsRecord.consents = consents;
      consentsRecord.timestamp = new Date();
      consentsRecord.save();
      response.send(consents);
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'The list of consents cannot be obtained. Please try again.' });
  }
};

async function getConsentsFromTrulioo(country, truliooInstance) {
  const response = await truliooInstance.get(`/configuration/v1/consents/Identity%20Verification/${country}`);
  return response.data;
}
