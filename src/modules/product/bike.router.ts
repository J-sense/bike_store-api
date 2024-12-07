import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();
router.post('/created-bike', bikeController.createBike);
router.get('/products', bikeController.findall);
router.get('/:id', bikeController.findOneProduct);
router.put('/:id', bikeController.updateProduct);
router.delete('/:id', bikeController.deleteProduct);

export const bikeroutes = router;
