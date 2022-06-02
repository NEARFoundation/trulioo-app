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
    const code = req.params.code;
    let applicant;

    if (sessionId) {
      const lastSession = await findLastSession(code);
      if (sessionId !== lastSession.session_id) {
        if (lastSession.status !== "new") {
          return res.status(400).send({ error: 'This URL can only be used from the browser of the computer ' +
              'on which the session was started earlier.' });
        }
        sessionId = lastSession.session_id;
      }
      applicant = lastSession;
      if (forced) {
        applicant = await createApplicant(code, sessionId);
      }

    } else {
      if (forced) {
        return res.status(400).send({ error: 'Session ID cannot be empty.' });
      }
      applicant = await findLastSession(code);
      if (!applicant) {
        applicant = await createApplicant(code);
      } else {
        if (applicant.status !== "new") {
          return res.status(400).send({ error: 'The session for this URL is already registered in another browser ' +
              'or on another computer.' });
        }
      }
    }

    res.send({ session_id: applicant.session_id, status: applicant.status });

  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ error: 'Session not registered. Please try again later.' });
  }
}

async function createApplicant(code, oldSessionId = null) {
  const sessionId = createUniqueId();
  const applicant = new Applicant({
    session_id: sessionId,
    code: code,
    session_timestamp: new Date(),
    status: "new",
    old_session_id: oldSessionId
  });
  await applicant.save();
  return applicant;
}

const findLastSession = async (code) => {
  let session = await findNextSession(code, null);
  let nextSession = session ? await findNextSession(code, session.session_id) : null;
  while (nextSession) {
    session = nextSession;
    nextSession = await findNextSession(code, session.session_id);
  }
  return session;
}

const findNextSession = async (code, oldSessionId = null) => {
  return Applicant.findOne({code: code, old_session_id: {$eq: oldSessionId}});
}

export const checkSession = async (req, res, expectedStatus) => {
  let sessionFailed = null;
  let applicant = null;
  const sessionId = req.body["session_id"];
  if (!sessionId) {
    sessionFailed =  res.status(400).send({ error: 'Session ID cannot be empty.' });
  } else {
    applicant = await Applicant.findOne({session_id: sessionId});
    if (!applicant) {
      sessionFailed = res.status(400).send({ error: 'Session not found.' });
    } else {
      const code = req.params.code;
      if (code !== applicant.code) {
        sessionFailed = res.status(400).send({ error: 'Invalid session ID.' });
      } else {
        const nextSession = await findNextSession(code, sessionId);
        if (nextSession) {
          sessionFailed = res.status(400).send({ error: 'This session ID is no longer valid.' });
        } else {
          if (applicant.status !== expectedStatus) {
            sessionFailed = res.status(400).send({ error: 'Verification cannot be performed at this stage.' });
          }
        }
      }
    }
  }
  return {sessionFailed, applicant};
}
