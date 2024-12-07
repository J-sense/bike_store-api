import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();
router.post('/products', bikeController.createBike);
router.get('/products', bikeController.findall);
router.get('/products/:id', bikeController.findOneProduct);
router.patch('/products/:id', bikeController.updateProduct);
router.delete('/products/:id', bikeController.deleteProduct);

export const bikeroutes = router;
