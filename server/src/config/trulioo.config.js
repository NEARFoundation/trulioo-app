import axios from 'axios';

export const ASYNC_CALLBACK_URL = `${process.env.EXTERNAL_SERVER_URL}/api/send-check-result`;
export const EMBED_ID_TOKEN_URL = `https://api-gateway-admin.trulioo.com/embedids/tokens`;
export const truliooApiKey = process.env.X_TRULIOO_API_KEY;

export const truliooInstance = axios.create({
  baseURL: process.env.TRULIOO_BASE_URL,
  timeout: 10000,
  headers: {'x-trulioo-api-key': truliooApiKey}
});
