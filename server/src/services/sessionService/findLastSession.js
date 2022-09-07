/* eslint-disable import/extensions */
import { findNextSession } from './findNextSession.js';

export const findLastSession = async (code) => {
  let session = await findNextSession(code, null);
  let nextSession = session ? await findNextSession(code, session.sessionId) : null;
  while (nextSession && session.sessionId !== nextSession.sessionId) {
    session = nextSession;
    nextSession = await findNextSession(code, session.sessionId);
  }

  return session;
};
