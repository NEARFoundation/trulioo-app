import 'dotenv/config'
import { createSchedules } from "./services/cronSchedule/cronSchedule.js";
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import https from 'https';
import mongoose from 'mongoose';
import { routes } from "./routes/collector.routes.js";
import { truliooInstance } from "./config/trulioo.config.js";
import { loggingRequestAndResponse, rawBody } from "./helpers/loggingRequestAndResponse.js";
import { createNewCode } from "./helpers/codeUtils.js";

await mongoose.connect(process.env.MONGO);
const app = express();
app.use(rawBody);
app.use(loggingRequestAndResponse);
app.set('trulioo', truliooInstance);

routes(app);
createSchedules(app);

const options = {
  key: fs.readFileSync("/var/www/trulioo_app/server.key"),
  cert: fs.readFileSync("/var/www/trulioo_app/server.crt"),
  dhparam: fs.readFileSync("/var/www/trulioo_app/dh-strong.pem"),
};
app.use(helmet());

// Set HTTP port
app.listen(process.env.APP_LOCAL_PORT_HTTP || 8080);

// Set HTTPS port, listen for requests
const PORT = process.env.APP_LOCAL_PORT_HTTPS || 8443;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// TODO: create a admin service
//let expiryDate = new Date();
//expiryDate.setDate(expiryDate.getDate() + 30);
//await createNewCode(expiryDate);
