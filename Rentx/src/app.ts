import express, { Express } from 'express';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import { AppErrorHandler } from './middlewares/errorHandler';
import { router } from './routes';

const swaggerFile = YAML.load(path.resolve(__dirname, './swagger.yml'));

class App {
  public server: Express;
  constructor() {
    this.server = express();
    this.middlewares();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(router);
    this.server.use(AppErrorHandler);
    this.server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  }
}

export default new App().server;