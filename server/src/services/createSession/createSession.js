import { Applicant } from "../../models/Applicant.js";
import { checkCode, invalidCode } from "../../helpers/codeUtils.js";
import { createUniqueId } from "../../helpers/createUniqueId.js";

export const createSession = async (req, res) => {
  try {
    const checkResult = await checkCode(req);
    if (!checkResult) {
      return invalidCode(res);
    }

    let sessionId = req.body["session_id"];
    const forced = req.body["forced"];
    let applicant;

    if (sessionId) {
      applicant = await Applicant.findOne({session_id: sessionId});
      if (!applicant) {
        return res.status(400).send({ error: 'Session not found.' });
      }

      if (forced === "true") {
        applicant = await createApplicant(req, sessionId);
      }

    } else {
      applicant = await createApplicant(req);
    }

    res.send({ session_id: applicant.session_id, status: applicant.status });

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Session not registered. Please try again later.' });
  }
}

async function createApplicant(req, oldSessionId = null) {
  const sessionId = createUniqueId();
  let applicant = new Applicant({
    session_id: sessionId,
    code: req.params.code,
    session_timestamp: new Date(),
    status: "new",
    old_session_id: oldSessionId
  });
  await applicant.save();
  return applicant;
}
