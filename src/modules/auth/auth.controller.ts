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
const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log(req.user);
    const passwordData = req.body; // No need for { ...passwordData }, just use req.body
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
};
