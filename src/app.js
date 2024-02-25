import express from "express";
import utils from "./utils/middleware";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(utils.requestLogger);

app.use(utils.unknownEndpoint);
app.use(utils.errorHandler);

export default app