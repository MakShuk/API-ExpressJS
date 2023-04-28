import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../common/base.controle.js';
import { LoggerService } from '../logger/logger.service.js';
import { HTTPError } from '../errors/http-error.class.js';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.intrerface.js';
import { TYPES } from '../types.js';
import { IUserController } from './user.conroller.interface.js';

import 'reflect-metadata';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerServise: ILogger) {
		super(loggerServise);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Ошибка ваторизации', 'login'));
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}
}
