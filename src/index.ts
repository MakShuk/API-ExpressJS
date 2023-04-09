import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';
const app = express();

const port = 8000;

app.all('/hello', (req: Request, res: Response, next: NextFunction): void => {
  console.log('all');
  next();
});

const cb = (req: Request, res: Response, next: NextFunction) => {
  console.log('cb');
  next();
};

app.use('/users', userRouter);

app
  .route('/user')
  .get((req: Request, res: Response, next: NextFunction) => {
    res.status(201).send({ sucsess: true });
  })
  .post((req: Request, res: Response, next: NextFunction) => {
    res.send('Hi POST');
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
