import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/user.conroller';
import { ExeptionFilter } from './errors/exeption.filter';
import { TYPES } from './types';
import { ILogger } from './logger/logger.intrerface';
import { IExeptionFilter } from './errors/exeption.filter.inteface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExceptionFilter).to(ExeptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
