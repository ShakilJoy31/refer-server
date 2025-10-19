import cors from 'cors';
import express, { Application } from 'express';

import userRoute from './app/modules/bookself.routes';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use("/api/v1/CyberCraft-Bangladesh-assignment", userRoute);


  export default app;