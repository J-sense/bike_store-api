import express, { Application, Response, Request } from 'express';
const app: Application = express();
import cors from 'cors';
import { bikeroutes } from './modules/product/bike.router';
import { orderRoutes } from './modules/orders/order.router';

app.use(express.json());
app.use(cors());
app.use('/api/v1', bikeroutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
