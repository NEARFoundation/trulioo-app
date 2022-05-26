import { checkCode, invalidCode } from "../../helpers/codeUtils.js";

export const testAuthentication = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const truliooInstance = req.app.get('trulioo');
    await truliooInstance.get(`/connection/v1/testauthentication`);
    res.send({result: true});

  } catch (e) {
    console.log(e);
    res.send({result: false});
  }
}
