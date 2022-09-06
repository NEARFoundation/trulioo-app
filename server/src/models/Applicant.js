import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
  sessionId: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  code: String,
  sessionTimestamp: Date,
  status: String,
  personInfo: Object,
  location: Object,
  communication: Object,
  identityVerificationTransactionId: String,
  documentVerificationTransactionId: String,
  identityVerificationTransactionRecordId: String,
  documentVerificationTransactionRecordId: String,
  experienceTransactionId: String,
  identityVerificationResult: Object,
  documentVerificationResult: Object,
  identityVerificationVerifyBeginTimestamp: Date,
  identityVerificationVerifyEndTimestamp: Date,
  documentVerificationVerifyBeginTimestamp: Date,
  documentVerificationVerifyEndTimestamp: Date,
  oldSessionId: String,
});
schema.index({ code: 1, oldSessionId: 1 }, { unique: true });
schema.index({ identityVerificationTransactionId: 1 }, { unique: false });
schema.index({ documentVerificationTransactionId: 1 }, { unique: false });
schema.index({ documentVerificationVerifyBeginTimestamp: 1, status: 1, documentVerificationTransactionId: 1 }, { unique: false });

export const Applicant = model('Applicant', schema);
