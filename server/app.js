import http from "http";
import express from "express";
import morgan from "morgan";
import { withAuth } from "./middleware/auth.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const httpServer = http.createServer(app);
const port = process.env.PORT;
import authentication from "./routes/authentication/index.js";
import user from "./routes/user/index.js";
import maintenance from "./routes/maintenance/index.js";
import processRouter from "./routes/process/index.js";
import service from "./routes/service/index.js";
import supplier from "./routes/supplier/index.js";


app.use("/api", authentication);
app.use("/api/user", withAuth, user);
app.use("/api/maintenance", withAuth, maintenance);
app.use("/api/process", withAuth, processRouter);
app.use("/api/service", withAuth, service);
app.use("/api/supplier", withAuth, supplier);


httpServer.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});