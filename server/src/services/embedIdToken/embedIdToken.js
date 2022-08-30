import axios from 'axios';

import { EMBED_ID_TOKEN_URL, truliooApiKey } from "../../config/trulioo.config.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";

export const embedIdToken = async (request, res) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(res);
    }

    const response = await axios.post(
      EMBED_ID_TOKEN_URL,
      {
        publicKey: request.params.publicKey
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

  } catch (error) {
    console.log(error);
    res
      .status(401)
      .send({ error: 'Unable to create EmbedID token at this time. Please try again.' });
  }

}
