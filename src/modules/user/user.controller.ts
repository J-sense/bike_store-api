import { userService } from './user.service';
import { NextFunction, Request, Response } from 'express';

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userService.creatAdmin(req.body);
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const userController = {
  createAdmin,
};
