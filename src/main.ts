import { App } from './app.js';

async function bootsrap() {
  const app = new App();
  await app.init();
}

bootsrap();
