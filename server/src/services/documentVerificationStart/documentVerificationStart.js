/* eslint-disable import/extensions */
import { checkCode, invalidCode } from '../../helpers/codeUtils.js';
import { checkSession } from '../sessionService/sessionService.js';

export const documentVerificationStart = async (request, response) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(response);
    }

    const { sessionFailed, applicant } = await checkSession(request, response, 'identity_verification_completed');
    if (sessionFailed) {
      return sessionFailed;
    }

    const { experienceTransactionId, status } = request.body;
    if (status !== 200 || !experienceTransactionId) {
      return response.status(400).send({ error: 'Document verification has not started.' });
    }

    applicant.status = 'document_verification_in_progress';
    applicant.experienceTransactionId = experienceTransactionId;
    applicant.documentVerificationVerifyBeginTimestamp = new Date();
    await applicant.save();

    response.send({ status: applicant.status });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'Failed to start verification. Please try again.' });
  }
};
