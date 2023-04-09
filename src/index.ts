import express, { Request, Response, NextFunction } from 'express';
import { userRouter } from './users/users.js';
const app = express();

const port = 8000;

app.all('/hello', (req: Request, res: Response, next: NextFunction): void => {
  console.log('all');
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time ', Date.now());
  next();
});

app.use('/users', userRouter);

app
  .route('/user')
  .get((req: Request, res: Response, next: NextFunction) => {
    res.status(201).send({ sucsess: true });
  })
  .post((req: Request, res: Response, next: NextFunction) => {
    res.send('Hi POST');
  });


app.use((err: Error, req: Request, res: Response) => {
  if (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
    return;
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
