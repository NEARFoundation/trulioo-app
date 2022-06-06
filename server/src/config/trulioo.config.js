import axios from 'axios';

const TRULIOO_BASE_URL = process.env.TRULIOO_PRODUCTION === "true" ?
  'https://gateway.trulioo.com/live' : 'https://gateway.trulioo.com/trial';
export const ASYNC_CALLBACK_URL = `api/send-check-result`;
export const EXTERNAL_SERVER_URL = `${process.env.EXTERNAL_SERVER_URL}`;
export const EMBED_ID_TOKEN_URL = `https://api-gateway-admin.trulioo.com/embedids/tokens`;
export const EXPERIENCE_TRANSACTION_URL = 'https://gateway.trulioo.com/experienceTransaction';
export const truliooApiKey = process.env.X_TRULIOO_API_KEY;

export const truliooInstance = axios.create({
  baseURL: TRULIOO_BASE_URL,
  timeout: 10000,
  headers: {'x-trulioo-api-key': truliooApiKey}
});
