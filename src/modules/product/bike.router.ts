import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();
router.post('/created-bike', bikeController.createBike);
router.get('/', bikeController.findall);
router.get('/:id', bikeController.findall);
router.put('/:id', bikeController.updateProduct);

export const bikeroutes = router;
