import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();
router.post('/order', orderController.createOrderController);
router.get('/revenue', orderController.getRevenue);

export const orderRoutes = router;
