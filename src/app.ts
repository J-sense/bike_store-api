import express, { Application, Response, Request } from 'express';
const app: Application = express();
import cors from 'cors';
import { bikeroutes } from './modules/product/bike.router';
import { orderRoutes } from './modules/orders/order.router';
import { authRoutes } from './modules/auth/auth.route';
import globalErrorHandler from './middleware/globalErrorHandler';
import notfound from './middleware/notFound';
import { userRouts } from './modules/user/user.route';

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://bike-store-kappa.vercel.app'],
  }),
);
app.use('/api', authRoutes);
app.use('/api', userRouts);
app.use('/api', bikeroutes);
app.use('/api', orderRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.use(globalErrorHandler);
app.use(notfound);
export default app;
