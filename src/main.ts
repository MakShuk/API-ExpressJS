import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/user.conroller.js';

async function bootsrap() {
  const logger = new LoggerService();
  const app = new App(logger, new UserController(logger));
  await app.init();
}

bootsrap();
