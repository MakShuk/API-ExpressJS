import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controle.js';
import { LoggerService } from '../logger/logger.service.js';
import { HTTPError } from '../errors/http-error.class.js';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.intrerface.js';
import { TYPES } from '../types.js';


import 'reflect-metadata'; 

@injectable()
export class UserController extends BaseController {
  constructor(@inject(TYPES.ILogger) private loggerServise: ILogger) {
    super(loggerServise);
    this.bindRoutes([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, 'Ошибка ваторизации', 'login'));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }
}
