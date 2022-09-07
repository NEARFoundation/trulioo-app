import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema({
  country: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  consents: Object,
  timestamp: Date
});

export const Consents = model('Consents', schema);
// Hours
export const cacheExpirationPeriod = 24;
