import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { checkSession } from "../createSession/createSession.js";

export const documentVerificationStart = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const { sessionFailed, applicant } = await checkSession(req, res, 'identity_verification_completed');
    if (sessionFailed) {
      return sessionFailed;
    }

    const { experienceTransactionId, status } = req.body;
    if (status !== 200 || !experienceTransactionId) {
      return res.status(400).send({ error: 'Document verification has not started.' });
    }

    applicant.status = 'document_verification_in_progress';
    applicant.fe_tx_id = experienceTransactionId;
    applicant.verify2_begin_timestamp = new Date();
    await applicant.save();

    res.send({ status: applicant.status });

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Failed to start verification. Please try again.' });
  }
}
