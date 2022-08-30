import { Code } from '../models/Code';
import { findLastSession } from '../services/sessionService/sessionService';

import { createUniqueId } from './createUniqueId';

export const checkCode = async (request) => {
  const code = request.params.code;
  if (!code) {
    return false;
  }

  const storedCode = await Code.findOne({ code });
  const applicant = await findLastSession(code);
  return storedCode !== null && new Date() < storedCode.expiryDate && (storedCode.enabled || (applicant && applicant.status === 'document_verification_completed'));
};

export const invalidCode = (response) => {
  return response.status(404).send({ error: 'This URL is incorrect or has been used before' });
};

export const createNewCode = async (expiryDate) => {
  const codeTimestamp = new Date();
  if (!expiryDate || codeTimestamp > expiryDate) {
    throw new Error('The expiration date cannot be less than the current date.');
  }

  let code = createUniqueId();
  let attempts = 1;
  let storedCode = await Code.findOne({ code });
  while (storedCode) {
    attempts++;
    if (attempts > 3) {
      throw new Error('Unable to generate new code, please try again.');
    }

    code = createUniqueId();
    storedCode = await Code.findOne({ code });
  }

  const codeEntity = new Code({
    code,
    codeTimestamp: new Date(),
    expiryDate: new Date(expiryDate),
    enabled: true,
  });
  await codeEntity.save();
  return codeEntity;
};

export const disableCode = async (code) => {
  const storedCode = await Code.findOne({ code });
  if (!storedCode) {
    throw new Error('Code not found.');
  }

  storedCode.enabled = false;
  await storedCode.save();
};
