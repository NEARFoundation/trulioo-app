import { cacheExpirationPeriod, CountrySubdivisions } from "../../models/CountrySubdivisions.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { hoursDifference } from "../../helpers/hoursDifference.js";

export const getCountrySubdivisions = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const { country } = req.query;
    let countrySubdivisionsRecord = await CountrySubdivisions.findOne({country: country});
    if (countrySubdivisionsRecord &&
      hoursDifference(new Date(), countrySubdivisionsRecord.timestamp) < cacheExpirationPeriod)
    {
      res.send(countrySubdivisionsRecord.countrySubdivisions);
    } else {
      const countrySubdivisions = await getCountrySubdivisionsFromTrulioo(country, req.app.get('trulioo'));
      if (!countrySubdivisionsRecord) {
        countrySubdivisionsRecord = new CountrySubdivisions({country: country});
      }
      countrySubdivisionsRecord.countrySubdivisions = countrySubdivisions;
      countrySubdivisionsRecord.timestamp = new Date();
      countrySubdivisionsRecord.save();
      res.send(countrySubdivisions);
    }

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'The list of subdivisions cannot be obtained. Please try again.' });
  }
}

async function getCountrySubdivisionsFromTrulioo(country, truliooInstance) {
  const response = await truliooInstance.get(`/configuration/v1/countrysubdivisions/${country}`);
  return response.data;
}
