import { injectable } from 'inversify';
import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.intrerface';

import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger({ hideLogPositionForProduction: true });
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
