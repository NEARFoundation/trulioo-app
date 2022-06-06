import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  countries: Object,
  timestamp: Date
});

export const Countries = model('Countries', schema);
// Hours
export const cacheExpirationPeriod = 24;
