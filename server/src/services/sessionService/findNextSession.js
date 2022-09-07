/* eslint-disable import/extensions */
import { Applicant } from '../../models/Applicant.js';

export const findNextSession = async (code, oldSessionId = null) => {
  return Applicant.findOne({ code, oldSessionId: { $eq: oldSessionId } });
};
