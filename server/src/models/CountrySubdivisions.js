import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
  country: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },
  countrySubdivisions: Object,
  timestamp: Date
});

export const CountrySubdivisions = model('CountrySubdivisions', schema);
// Hours
export const cacheExpirationPeriod = 24;
