import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  transactionId: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  rawBody: String,
  transactionRecordId: String,
  status: String,
  transactionTimestamp: Date,
  processed: Boolean,
});

export const Transaction = model('Transaction', schema);
