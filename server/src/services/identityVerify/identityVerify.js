import { ASYNC_CALLBACK_URL, EXTERNAL_SERVER_URL } from "../../config/trulioo.config.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { checkSession } from "../sessionService/sessionService.js";

export const identityVerify = async (request, res) => {
  try {
    const checkResult = await checkCode(request);
    if (!checkResult) {
      return invalidCode(res);
    }

    const { sessionFailed, applicant } = await checkSession(request, res, 'new');
    if (sessionFailed) {
      return sessionFailed;
    }

    const { country, consents, fields } = request.body;
    const truliooInstance = request.app.get('trulioo');

    const response = await truliooInstance.post(
      `/verifications/v1/verify`,
      {
        "AcceptTruliooTermsAndConditions": true,
        "CleansedAddress": false,
        "ConfigurationName": "Identity Verification",
        "CallBackUrl": `${EXTERNAL_SERVER_URL}/${request.params.code}/${ASYNC_CALLBACK_URL}`,
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
    applicant.personInfo = fields.PersonInfo;
    applicant.location = fields.Location;
    applicant.communication = fields.Communication;
    applicant.txId1 = response.data.TransactionID;
    applicant.verifyBeginTimestamp1 = new Date();
    await applicant.save();

    res.send({ status: applicant.status });

  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error: 'Failed to start verification. Please try again.' });
  }
}
