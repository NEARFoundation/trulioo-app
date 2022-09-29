/* eslint-disable import/extensions */
import fs from 'fs';
import https from 'https';

import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { MONGO, PORT_HTTP, PORT_HTTPS, USE_SSL, CRT_PATH, NODE_ENV } from './config/app.config.js';
import { truliooInstance, EXTERNAL_SERVER_URL, GENERIC_CREATE_CODE_TOKEN } from './config/trulioo.config.js';
import { loggingRequestAndResponse, rawBody } from './helpers/loggingRequestAndResponse.js';
import { routes } from './routes/collector.routes.js';
import { createSchedules } from './services/cronSchedule/cronSchedule.js';

dotenv.config();

await mongoose.connect(MONGO);
const app = express();
app.use(rawBody);
app.use(loggingRequestAndResponse);
app.set('trulioo', truliooInstance);

routes(app);
createSchedules(app);

// Set HTTP port
app.listen(PORT_HTTP);

if (USE_SSL === 'true') {
  const crtPath = (CRT_PATH || '~/cert').replace(/\/+$/u, '');
  const options = {
    key: fs.readFileSync(`${crtPath}/server.key`),
    cert: fs.readFileSync(`${crtPath}/server.crt`),
    dhparam: fs.readFileSync(`${crtPath}/dh-strong.pem`),
  };
  app.use(helmet());
  // Set HTTPS port, listen for requests

  https.createServer(options, app).listen(PORT_HTTPS, () => {
    console.log(`Server is running on port ${PORT_HTTPS}.`);
  });
}

if (NODE_ENV === 'development') {
  console.log(`Please visit ${EXTERNAL_SERVER_URL}/kyc/${GENERIC_CREATE_CODE_TOKEN}`); // This logging gets used locally for testing purposes. See README.md for more details.
}
