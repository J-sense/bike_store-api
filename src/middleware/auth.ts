import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../modules/user/user.model';

const auth = (requireRole?: string) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization; // Extract the token (Bearer <token>)
    if (!token) {
      throw new Error('You are not authorized');
    }

    try {
      const decoded = jwt.verify(token, 'secret') as JwtPayload;
      const { email, role } = decoded;

      const user = await User.findOne({ email: email }); // Add `await` to handle the promise
      if (!user) {
        throw new Error('User not found');
      }

      if (requireRole && !requireRole.includes(role)) {
        throw new Error('You are not authorized');
      }

      req.user = decoded; // Attach decoded payload to `req.user`
      next();
    } catch (err) {
      next(err);
    }
  });
export default auth;
