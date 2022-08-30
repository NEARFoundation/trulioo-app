import axios from 'axios';

import { EMBED_ID_TOKEN_URL, truliooApiKey } from '../../config/trulioo.config';
import { checkCode, invalidCode } from '../../helpers/codeUtils';

export const embedIdToken = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    const responseToSend = await axios.post(
      EMBED_ID_TOKEN_URL,
      {
        publicKey: request.params.publicKey,
      },
      {
        headers: {
          'x-trulioo-api-key': truliooApiKey,
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
        },
      },
    );
    response.send(responseToSend.data);
  } catch (error) {
    console.log(error);
    response.status(401).send({ error: 'Unable to create EmbedID token at this time. Please try again.' });
  }
};
