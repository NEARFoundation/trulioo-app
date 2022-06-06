import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  country: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  fields: Object,
  timestamp: Date
});

export const Fields = model('Fields', schema);
// Hours
export const cacheExpirationPeriod = 24;
