import express from 'express';
import { authController } from './auth.controller';
import validateMiddleware from '../../middleware/validateRequest';
import { userValidation } from '../user/user.validation';
import auth from '../../middleware/auth';
// import auth from '../../middleware/auth';
const router = express.Router();
router.post(
  '/auth/register',
  validateMiddleware(userValidation.userValidationSchema),
  authController.register,
);
router.post(
  '/auth/login',
  //   validateMiddleware(userValidation.userValidationSchema),
  authController.allUser,
);
router.get(
  '/auth/all',
  //   validateMiddleware(userValidation.userValidationSchema),
  authController.login,
);
router.post(
  '/auth/changePassword',
  auth('customer'),
  authController.changePassword,
);
export const authRoutes = router;
