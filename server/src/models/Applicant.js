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
  txId1: String,
  txId2: String,
  txRecordId1: String,
  txRecordId2: String,
  feTxId: String,
  result1: Object,
  result2: Object,
  verifyBeginTimestamp1: Date,
  verifyEndTimestamp1: Date,
  verifyBeginTimestamp2: Date,
  verifyEndTimestamp2: Date,
  oldSessionId: String
});
schema.index({code: 1, oldSessionId: 1}, {unique: true});
schema.index({txId1: 1}, {unique: false});
schema.index({txId2: 1}, {unique: false});
schema.index({verifyBeginTimestamp2: 1, status: 1, txId2: 1}, {unique: false});

export const Applicant = model('Applicant', schema);
