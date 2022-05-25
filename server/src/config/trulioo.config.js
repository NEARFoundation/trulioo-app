import axios from 'axios';

export const truliooInstance = axios.create({
  baseURL: process.env.TRULIOO_BASE_URL,
  timeout: 10000,
  headers: {'x-trulioo-api-key': process.env.X_TRULIOO_API_KEY}
});
