import express from 'express';
import cors from 'cors';
import utils from './utils/middleware';
import faceRouter from './routes/face-detection';
import YAML from 'yamljs';
import swaggerUI from 'swagger-ui-express';
import path from 'path';

const swaggerDoc = YAML.load(path.join(__dirname, './openAPI.yaml'));

const app = express();

app.use(cors());
app.use(express.json());
app.use(utils.requestLogger);
//app.use('/api/face_detection', faceRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(utils.unknownEndpoint);
app.use(utils.errorHandler);

export default app;
