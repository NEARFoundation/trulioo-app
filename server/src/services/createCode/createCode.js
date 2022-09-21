/* eslint-disable import/extensions */
import { EXTERNAL_SERVER_URL } from '../../config/trulioo.config.js';
import { createNewCode } from '../../helpers/codeUtils.js';

export const createCode = async (request, response) => {
  try {
    console.log('Creating a new URL');
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365);
    const codeEntity = await createNewCode(expiryDate);
    const url = `${EXTERNAL_SERVER_URL}/${codeEntity.code}`;
    response.redirect(url);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'Could not create a KYC link' });
  }
};
