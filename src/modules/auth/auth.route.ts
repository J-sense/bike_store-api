import express from 'express';
import { authController } from './auth.controller';
import validateMiddleware from '../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';
const router = express.Router();
router.post(
  '/auth/register',
  validateMiddleware(userValidation.userValidationSchema),
  authController.register,
);
router.post(
  '/auth/login',
  //   validateMiddleware(userValidation.userValidationSchema),
  authController.login,
);
export const authRoutes = router;
