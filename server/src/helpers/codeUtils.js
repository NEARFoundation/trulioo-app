import { Code } from "../models/Code.js";
import { createUniqueId } from "./createUniqueId.js";

export const checkCode = async (req) => {
  const code = req.params.code;
  if (!code) {
    return false;
  }
  const storedCode = await Code.findOne({code: code});
  return storedCode !== null && new Date() < storedCode.expiryDate && storedCode.enabled;
}

export const invalidCode = (res) => {
  return res.status(404).send({ error: 'This code is incorrect or has been used before' });
}

export const createNewCode = async (expiryDate) => {
  const codeTimestamp = new Date();
  if (!expiryDate || codeTimestamp > expiryDate) {
    throw new Error('The expiration date cannot be less than the current date.');
  }
  let code = createUniqueId();
  let attempts = 1;
  let storedCode = await Code.findOne({code: code});
  while (storedCode) {
    attempts++;
    if (attempts > 3) {
      throw new Error('Unable to generate new code, please try again.');
    }
    code = createUniqueId();
    storedCode = await Code.findOne({code: code});
  }

  const codeEntity = new Code({
    code: code,
    codeTimestamp: new Date(),
    expiryDate: new Date(expiryDate),
    enabled: true
  });
  await codeEntity.save();
  return codeEntity;
}

export const disableCode = async (code) => {
  let storedCode = await Code.findOne({code: code});
  if (!storedCode) {
    throw new Error('Code not found.');
  }
  storedCode.enabled = false;
  await storedCode.save();
}
