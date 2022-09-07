import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
  code: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  codeTimestamp: Date,
  expiryDate: Date,
  enabled: Boolean
});

export const Code = model('Code', schema);
