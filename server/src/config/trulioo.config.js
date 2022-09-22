import axios from 'axios';

const TRULIOO_BASE_URL = process.env.TRULIOO_PRODUCTION === 'true' ? 'https://gateway.trulioo.com/live' : 'https://gateway.trulioo.com/trial';
export const LINK_DAYS_BEFORE_EXPIRATION = process.env.LINK_DAYS_BEFORE_EXPIRATION || 7;
export const ASYNC_CALLBACK_URL = `api/send-check-result`;
export const EXTERNAL_SERVER_URL = `${process.env.EXTERNAL_SERVER_URL}`;
export const EMBED_ID_TOKEN_URL = `https://api-gateway-admin.trulioo.com/embedids/tokens`;
export const EXPERIENCE_TRANSACTION_URL = 'https://gateway.trulioo.com/experienceTransaction';
export const GENERIC_CREATE_CODE_TOKEN = process.env.GENERIC_CREATE_CODE_TOKEN;
export const truliooApiKey = process.env.X_TRULIOO_API_KEY;
export const truliooPublicKey = process.env.TRULIOO_PUBLIC_KEY;

export const truliooInstance = axios.create({
  baseURL: TRULIOO_BASE_URL,
  timeout: 10_000,
  headers: { 'x-trulioo-api-key': truliooApiKey },
});
