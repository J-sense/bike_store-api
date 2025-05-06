import { NextFunction, Request, Response } from 'express';
import { authService } from './auth.service';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    res.status(201).json({
      success: true,
      message: 'Logged in successfully',
      token: result.token,
      data: result.isUserExist,
    });
  } catch (error) {
    next(error);
  }
};
const allUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.alluser();
    res.status(201).json({
      success: true,
      message: 'All user retrieved successfully',

      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      throw new Error('You are anuathourized');
    }

    const passwordData = req.body; // Extract oldPassword & newPassword from req.body
    const result = await authService.changePassword(req.user, passwordData);

    res.status(200).json({
      message: 'Password changed successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    next(error); // Pass error to Express error handler
  }
};

export const authController = {
  register,
  login,
  changePassword,
  allUser,
};
