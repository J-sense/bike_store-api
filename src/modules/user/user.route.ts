import express from 'express';
import validateMiddleware from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';
const router = express.Router();
router.post(
  '/auth/create-admin',
  validateMiddleware(userValidation.userValidationSchema),
  userController.createAdmin,
);
export const userRouts = router;
