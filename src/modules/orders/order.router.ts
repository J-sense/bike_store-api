import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';

const router = express.Router();
router.post('/order', auth('customer'), orderController.createOrderController);
router.get('/order', auth('customer'), orderController.verifyOrder);
router.get('/revenue', orderController.getRevenue);
router.get('/all-order', orderController.allOrderComtroller);

export const orderRoutes = router;
