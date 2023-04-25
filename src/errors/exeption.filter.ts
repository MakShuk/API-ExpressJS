import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service.js';
import { IExeptionFilter } from './exeption.filter.inteface.js';
import { HTTPError } from './http-error.class.js';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.intrerface.js';
import { TYPES } from '../types.js';

import 'reflect-metadata'; 

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(err: HTTPError | Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context || '???'}] Ошибка ${err.statusCode}: ${err.message}`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send({ err: err.message });
    }
  }
}
