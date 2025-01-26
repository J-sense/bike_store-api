import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import { handleZodError } from './handleZodError';

type AppError = {
  statusCode?: number;
  message: string;
  errorSource?: TErrorSource;
  stack?: string;
};

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';
  const errorSource: TErrorSource = err.errorSource || [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    res.status(simplifiedError.statusCode).json({
      success: false,
      message: simplifiedError.message,
      errorSource: simplifiedError.errorSource,
    });
  } else {
    // General error handling
    res.status(statusCode).json({
      success: false,
      message,
      errorSource,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  }

  // Call next to ensure middleware chain continues if needed
  next();
};

export default globalErrorHandler;
