import cors from 'cors';
import express, { Application } from 'express';
import userRoute from './app/modules/refer-server-routes';

const app: Application = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Root route
app.get("/", (req, res) => {
    res.send("Refer server is running");
});

app.use("/api/v1/filesure-assignment", userRoute);

export default app;