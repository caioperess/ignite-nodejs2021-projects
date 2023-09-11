import 'reflect-metadata';

import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import './shared/container';

import { ConnectDB } from './database';
import { router } from './routes';
const swaggerFile = YAML.load(path.resolve(__dirname, './swagger.yml'));

ConnectDB();
const app = express();
app.use(express.json());
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, () => console.log('Server running on port 3333'));
