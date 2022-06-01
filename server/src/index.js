import 'dotenv/config'
import { createSchedules } from "./services/cronSchedule/cronSchedule.js";
import express from 'express';
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
app.listen(process.env.PORT);

// TODO: create a service
//let expiryDate = new Date();
//expiryDate.setDate(expiryDate.getDate() + 30);
//await createNewCode(expiryDate);
