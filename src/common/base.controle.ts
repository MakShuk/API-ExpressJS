import { Router, Response } from 'express';
import { LoggerService } from '../logger/logger.service.js';
import { ICotrollerRoute } from './route.intreface.js';

export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: ICotrollerRoute[]): void {
    for (const route of routes) {
      const handler = route.func.bind(this);
      this.router[route.method](route.path, route.func);
      this.logger.log(`[${route.method}] ${route.path}`);
      return;
    }
  }
}