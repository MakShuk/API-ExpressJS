import express, { Request, Response, NextFunction } from 'express';
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
