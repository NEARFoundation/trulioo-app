import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import { routes } from "./routes/collector.routes.js";
import { truliooInstance } from "./config/trulioo.config.js";
import { createNewCode } from "./helpers/codeUtils.js";

await mongoose.connect(process.env.MONGO);
const app = express();
app.use(express.json());
app.set('trulioo', truliooInstance);

routes(app);
app.listen(process.env.PORT);

// TODO: create a service
//let expiryDate = new Date();
//expiryDate.setDate(expiryDate.getDate() + 30);
//await createNewCode(expiryDate);
