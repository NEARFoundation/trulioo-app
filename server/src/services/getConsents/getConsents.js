import { cacheExpirationPeriod, Consents } from "../../models/Consents.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { hoursDifference } from "../../helpers/hoursDifference.js";

export const getConsents = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const { country } = req.query;
    let consentsRecord = await Consents.findOne({country: country});
    if (consentsRecord && hoursDifference(new Date(), consentsRecord.timestamp) < cacheExpirationPeriod) {
      res.send(consentsRecord.consents);
    } else {
      const consents = await getConsentsFromTrulioo(country, req.app.get('trulioo'));
      if (!consentsRecord) {
        consentsRecord = new Consents({country: country});
      }
      consentsRecord.consents = consents;
      consentsRecord.timestamp = new Date();
      consentsRecord.save();
      res.send(consents);
    }

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'The list of consents cannot be obtained. Please try again.' });
  }
}

async function getConsentsFromTrulioo(country, truliooInstance) {
  const response = await truliooInstance.get(`/configuration/v1/consents/Identity%20Verification/${country}`);
  return response.data;
}
