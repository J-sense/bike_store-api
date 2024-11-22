import express from 'express';
import { bikeController } from './bike.controller';

const router = express.Router();
router.post('/created-bike', bikeController.createBike);

export const bikeroutes = router;
