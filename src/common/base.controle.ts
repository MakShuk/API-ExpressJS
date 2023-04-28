import { Router, Response } from 'express';
import { LoggerService } from '../logger/logger.service.js';
import { ExpressReturnType, ICotrollerRoute } from './route.intreface.js';
import { ILogger } from '../logger/logger.intrerface.js';
import { injectable } from 'inversify/lib/annotation/injectable.js';

import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: ICotrollerRoute[]): void {
		for (const route of routes) {
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
			this.logger.log(`[${route.method}] ${route.path}`);
		}
	}
}
