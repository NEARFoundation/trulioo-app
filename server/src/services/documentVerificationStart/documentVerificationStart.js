import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { checkSession } from "../sessionService/sessionService.js";

export const documentVerificationStart = async (request, res) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(res);
    }

    const { sessionFailed, applicant } = await checkSession(request, res, 'identity_verification_completed');
    if (sessionFailed) {
      return sessionFailed;
    }

    const { experienceTransactionId, status } = request.body;
    if (status !== 200 || !experienceTransactionId) {
      return res.status(400).send({ error: 'Document verification has not started.' });
    }

    applicant.status = 'document_verification_in_progress';
    applicant.feTxId = experienceTransactionId;
    applicant.verifyBeginTimestamp2 = new Date();
    await applicant.save();

    res.send({ status: applicant.status });

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: 'Failed to start verification. Please try again.' });
  }
}
