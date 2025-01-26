import { NextFunction, Request, Response } from 'express';

const notfound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    message: 'API Not Found',
    success: false,
    error: '',
  });
  next();
};
export default notfound;
