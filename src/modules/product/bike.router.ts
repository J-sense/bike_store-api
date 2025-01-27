import express from 'express';
import { bikeController } from './bike.controller';
import auth from '../../middleware/auth';

const router = express.Router();
router.post('/products', auth('customer'), bikeController.createBike);
router.get('/products', bikeController.findall);
router.get('/products/:id', bikeController.findOneProduct);
router.patch('/products/:id', bikeController.updateProduct);
router.delete('/products/:id', bikeController.deleteProduct);

export const bikeroutes = router;
