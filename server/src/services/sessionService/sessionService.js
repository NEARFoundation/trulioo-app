/* eslint-disable import/extensions */
import { checkCode, invalidCode } from '../../helpers/codeUtils.js';
import { createUniqueId } from '../../helpers/createUniqueId.js';
import { Applicant } from '../../models/Applicant.js';

import { findLastSession } from './findLastSession.js';
import { findNextSession } from './findNextSession.js';

export const createSession = async (request, response) => {
  try {
    let sessionId = request.body.session_id;
    const forced = request.body.forced;
    const code = request.params.code;

    const checkCodeResult = await checkCode(request);
    if (!checkCodeResult) {
      return invalidCode(response);
    }

    if (!sessionId && forced) {
      return response.status(400).send({ error: 'Session ID cannot be empty.' });
    }

    let applicant = await findLastSession(code);
    if (applicant) {
      if (applicant.status !== 'new') {
        if (sessionId) {
          if (sessionId !== applicant.sessionId) {
            return response.status(400).send({ error: 'This URL can only be used from the browser of the computer on which the session was started earlier.' });
          }
        } else {
          return response.status(400).send({ error: 'The session for this URL is already registered in another browser or on another computer.' });
        }
      } else if (sessionId !== applicant.sessionId) {
        applicant = await updateSessionId(applicant.sessionId);
        sessionId = applicant.sessionId;
      }

      if (forced) {
        applicant = await createApplicant(code, sessionId);
      }
    } else {
      applicant = await createApplicant(code);
    }

    response.send({ session_id: applicant.sessionId, status: applicant.status });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: 'Session not registered. Please try again later.' });
  }
};

async function createApplicant(code, oldSessionId = null) {
  const sessionId = createUniqueId();
  const applicant = new Applicant({
    sessionId,
    code,
    sessionTimestamp: new Date(),
    status: 'new',
    oldSessionId,
  });
  await applicant.save();
  return applicant;
}

async function updateSessionId(sessionId) {
  const applicant = await Applicant.findOne({ sessionId });
  if (applicant) {
    applicant.sessionId = createUniqueId();
    applicant.save();
  }

  return applicant;
}

export const checkSession = async (request, response, expectedStatus) => {
  let sessionFailed = false;
  let applicant = null;
  const sessionId = request.body.session_id;
  if (sessionId) {
    applicant = await Applicant.findOne({ sessionId });
    if (applicant) {
      const code = request.params.code;
      if (code === applicant.code) {
        const nextSession = await findNextSession(code, sessionId);
        if (nextSession) {
          response.status(400).send({ error: 'This session ID is no longer valid.' });
          sessionFailed = true;
        } else if (applicant.status !== expectedStatus) {
          response.status(400).send({ error: 'Verification cannot be performed at this stage.' });
          sessionFailed = true;
        }
      } else {
        response.status(400).send({ error: 'Invalid session ID.' });
        sessionFailed = true;
      }
    } else {
      response.status(400).send({ error: 'Session not found.' });
      sessionFailed = true;
    }
  } else {
    response.status(400).send({ error: 'Session ID cannot be empty.' });
    sessionFailed = true;
  }

  return { sessionFailed, applicant };
};
