import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.conroller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';
import { TYPES } from './types.js';
import { ILogger } from './logger/logger.intrerface.js';
import { IExeptionFilter } from './errors/exeption.filter.inteface.js';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExeptionFilter>(TYPES.ExceptionFilter).to(ExeptionFilter);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap(): { appContainer: Container; app: App } {
  const appContainer = new Container();
  appContainer.load(appBindings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
