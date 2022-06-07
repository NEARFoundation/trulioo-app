import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { completeProcessRedirectUrl } from "../../config/app.config.js";
import { truliooPublicKey } from "../../config/trulioo.config.js";

export const getParameters = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }
    res.send({
      trulioo_public_key: truliooPublicKey,
      finish_redirect_url: completeProcessRedirectUrl
    });

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'The parameters cannot be obtained. Please try again.' });
  }
}
