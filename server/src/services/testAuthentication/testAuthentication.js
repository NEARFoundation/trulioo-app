/* eslint-disable import/extensions */
import { checkCode, invalidCode } from '../../helpers/codeUtils.js';

export const testAuthentication = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    const truliooInstance = request.app.get('trulioo');
    await truliooInstance.get(`/connection/v1/testauthentication`);
    response.send({ result: true });
  } catch (error) {
    console.log(error);
    response.send({ result: false });
  }
};
