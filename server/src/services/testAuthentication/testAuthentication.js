import { checkCode, invalidCode } from "../../helpers/codeUtils.js";

export const testAuthentication = async (request, res) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(res);
    }

    const truliooInstance = request.app.get('trulioo');
    await truliooInstance.get(`/connection/v1/testauthentication`);
    res.send({result: true});

  } catch (error) {
    console.log(error);
    res.send({result: false});
  }
}
