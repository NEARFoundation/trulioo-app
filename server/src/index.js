/* eslint-disable import/extensions */
import 'dotenv/config';
import fs from 'fs';
import https from 'https';

import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { truliooInstance } from './config/trulioo.config.js';
// eslint-disable-next-line no-unused-vars
import { createNewCode } from './helpers/codeUtils.js';
import { loggingRequestAndResponse, rawBody } from './helpers/loggingRequestAndResponse.js';
import { routes } from './routes/collector.routes.js';
import { createSchedules } from './services/cronSchedule/cronSchedule.js';

await mongoose.connect(process.env.MONGO);
const app = express();
app.use(rawBody);
app.use(loggingRequestAndResponse);
app.set('trulioo', truliooInstance);

routes(app);
createSchedules(app);

// Set HTTP port
app.listen(process.env.APP_LOCAL_PORT_HTTP || 8_080);

if (process.env.USE_SSL === 'true') {
  const crtPath = (process.env.CRT_PATH || '~/cert').replace(/\/+$/u, '');
  const options = {
    key: fs.readFileSync(`${crtPath}/server.key`),
    cert: fs.readFileSync(`${crtPath}/server.crt`),
    dhparam: fs.readFileSync(`${crtPath}/dh-strong.pem`),
  };
  app.use(helmet());
  // Set HTTPS port, listen for requests
  const PORT = process.env.APP_LOCAL_PORT_HTTPS || 8_443;
  https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

// TODO: create a admin service
// let expiryDate = new Date();
// expiryDate.setDate(expiryDate.getDate() + 30);
// await createNewCode(expiryDate);
