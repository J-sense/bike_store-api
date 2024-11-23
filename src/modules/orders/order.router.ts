import express from 'express';
import { orderController } from './order.controller';

const router = express.Router();
router.post('/:productId', orderController.createOrder);

export const orderRoutes = router;
