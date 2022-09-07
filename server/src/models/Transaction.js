import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
  transactionId: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  transactionRecordId: String,
  transactionTimestamp: Date,
  processed: Boolean,
});

schema.index({transactionTimestamp: 1, processed: 1}, {unique: false});

export const Transaction = model('Transaction', schema);
