import express, { Express } from 'express';
import { IConfig } from './common/IConfig';
import middlewares from './middlewares';
import routes from './routes';

export class Application {
  config: IConfig;
  app: Express;

  constructor(config: IConfig) {
    this.config = config;
    this.app = express();
    middlewares()(this.app);
    routes(this.config)(this.app);
  }

  public getInstance(): Express {
    return this.app;
  }
}
