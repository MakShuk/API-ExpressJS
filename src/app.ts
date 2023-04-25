import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.conroller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { ILogger } from './logger/logger.intrerface.js';
import { injectable, inject } from 'inversify';
import { TYPES } from './types.js';

import 'reflect-metadata';

@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use('/users', this.userController.router);
  }

  useExeptionFilter() {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilter();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server running at http://localhost:${this.port}/`);
  }
}
