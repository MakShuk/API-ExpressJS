import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.conroller.js';
import { ExeptionFilter } from './errors/exeption.filter.js';

async function bootsrap() {
  const logger = new LoggerService();
  const app = new App(logger, new UserController(logger), new ExeptionFilter(logger));
  await app.init();
}

bootsrap();
