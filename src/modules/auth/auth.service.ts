import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = (payload: TUser) => {
  const result = User.create(payload);
  return result;
};
const login = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (!isUserExist) {
    throw new Error('User Not Exist!');
  }
  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExist?.password,
  );
  if (!isPasswordMatch) {
    throw new Error('Please! provide the correct password');
  }
  const jwtPayload = {
    // userId: isUserExist,
    role: isUserExist.role,
    email: isUserExist.email,
  };
  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '30d' });
  return { token, isUserExist };
};
export const authService = {
  register,
  login,
};
