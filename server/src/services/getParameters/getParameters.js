/* eslint-disable import/extensions */
import { completeProcessRedirectUrl } from '../../config/app.config.js';
import { truliooPublicKey } from '../../config/trulioo.config.js';
import { checkCode, invalidCode } from '../../helpers/codeUtils.js';

export const getParameters = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    response.send({
      trulioo_public_key: truliooPublicKey,
      finish_redirect_url: completeProcessRedirectUrl,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'The parameters cannot be obtained. Please try again.' });
  }
};
