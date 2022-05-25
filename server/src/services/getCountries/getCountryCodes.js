import { checkCode, invalidCode } from "../../helpers/codeUtils.js";

export const getCountryCodes = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const truliooInstance = req.app.get('trulioo');
    const response = await truliooInstance.get(`/configuration/v1/countrycodes/Identity%20Verification`);
    res.send(response.data);

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'The list of countries cannot be obtained. Please try again.' });
  }
}
