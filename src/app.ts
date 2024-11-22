import express, { Application, Response, Request } from 'express';
const app: Application = express();
import cors from 'cors';
import { bikeroutes } from './modules/product/bike.router';

app.use(express.json());
app.use(cors());
app.use('/api/v1/product', bikeroutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
