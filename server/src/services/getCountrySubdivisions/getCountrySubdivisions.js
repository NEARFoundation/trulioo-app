import { checkCode, invalidCode } from "../../helpers/codeUtils.js";

export const getCountrySubdivisions = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const truliooInstance = req.app.get('trulioo');
    const { country } = req.query;
    const response = await truliooInstance.get(`/configuration/v1/countrysubdivisions/${country}`);
    res.send(response.data);

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'The list of subdivisions cannot be obtained. Please try again.' });
  }
}
