import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();
router.post('/:productId', orderController.createOrder);
router.get('/revenue', orderController.getRevenue);

export const orderRoutes = router;
