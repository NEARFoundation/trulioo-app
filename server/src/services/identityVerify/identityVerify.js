import { Applicant } from "../../models/Applicant.js";
import { ASYNC_CALLBACK_URL } from "../../config/trulioo.config.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { findLaterSession } from "../createSession/createSession.js";

export const identityVerify = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const code = req.params.code;
    const sessionId = req.body["session_id"];
    if (!sessionId) {
      return res.status(400).send({ error: 'Session ID cannot be empty.' });
    }
    let applicant = await Applicant.findOne({session_id: sessionId});
    if (!applicant) {
      return res.status(400).send({ error: 'Session not found.' });
    }
    const lastSession = await findLaterSession(code, sessionId);
    if (lastSession) {
      return res.status(400).send({ error: 'This session ID is no longer valid.' });
    }
    if (applicant.status !== 'new') {
      return res.status(400).send({ error: 'Verification cannot be performed at this stage.' });
    }

    const { country, consents, fields } = req.body;
    const truliooInstance = req.app.get('trulioo');

    const response = await truliooInstance.post(
      `/verifications/v1/verify`,
      {
        "AcceptTruliooTermsAndConditions": true,
        "CleansedAddress": false,
        "ConfigurationName": "Identity Verification",
        "CallBackUrl": ASYNC_CALLBACK_URL,
        "ConsentForDataSources": consents,
        "CountryCode": country,
        "DataFields": fields
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    applicant.status = 'identity_verification_in_progress';
    applicant.person_info = fields.PersonInfo;
    applicant.location = fields.Location;
    applicant.communication = fields.Communication;
    applicant.tx1_id = response.data.TransactionID;
    applicant.verify1_begin_timestamp = new Date();
    await applicant.save();

    res.send({ status: applicant.status });

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Failed to start verification. Please try again.' });
  }
}
