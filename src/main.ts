import { Container } from 'inversify';
import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.conroller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { TYPES } from './types.js';
import { ILogger } from './logger/logger.intrerface.js';
import { IExeptionFilter } from './errors/exeption.filter.inteface.js';

// const logger = new LoggerService();
// const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExceptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
