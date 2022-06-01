import { ASYNC_CALLBACK_URL } from "../../config/trulioo.config.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { checkSession } from "../createSession/createSession.js";

export const identityVerify = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    const { sessionFailed, applicant } = await checkSession(req, res, 'new');
    if (sessionFailed) {
      return sessionFailed;
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
    applicant.person_info = fields["PersonInfo"];
    applicant.location = fields["Location"];
    applicant.communication = fields["Communication"];
    applicant.tx1_id = response.data["TransactionID"];
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
