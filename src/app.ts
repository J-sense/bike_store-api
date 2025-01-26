import express, { Application, Response, Request } from 'express';
const app: Application = express();
import cors from 'cors';
import { bikeroutes } from './modules/product/bike.router';
import { orderRoutes } from './modules/orders/order.router';
import { authRoutes } from './modules/auth/auth.route';
import globalErrorHandler from './middleware/globalErrorHandler';
import notfound from './middleware/notFound';

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);
app.use('/api', bikeroutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use(notfound);
export default app;
