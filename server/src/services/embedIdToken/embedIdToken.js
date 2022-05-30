import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { EMBED_ID_TOKEN_URL, truliooApiKey } from "../../config/trulioo.config.js";
import axios from 'axios';

export const embedIdToken = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const response = await axios.post(
      EMBED_ID_TOKEN_URL,
      {
        publicKey: req.params.publicKey
      },
      {
        headers: {
          'x-trulioo-api-key': truliooApiKey,
          'Content-Type': 'application/json',
          'cache-control': 'no-cache'
        }
      }
    );
    res.send(response.data);

  } catch (e) {
    console.log(e);
    res
      .status(401)
      .send({ error: 'Unable to create EmbedID token at this time. Please try again.' });
  }

}
