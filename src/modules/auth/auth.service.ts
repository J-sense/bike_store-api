// import { Request } from 'express';
import config from '../../config';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const register = (payload: TUser) => {
  const result = User.create(payload);
  return result;
};
const alluser = async () => {
  const result = await User.find();
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
    userId: isUserExist._id,
    role: isUserExist.role,
    email: isUserExist.email,
  };
  const token = jwt.sign(jwtPayload, 'secret', { expiresIn: '30d' });
  return { token, isUserExist };
};
// const updatePassword = (userData, req: Request) => {
//   const user = req.user;
//   const { oldPassword, newPassword } = req.body;
//   if()
// };
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new Error('This user is not found !');
  }
  const isMatch = await bcrypt.compare(payload.oldPassword, user.password);
  if (!isMatch) {
    throw new Error('Old password is incorrect!');
  }
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );
  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
  );
  return null;
};
export const authService = {
  register,
  login,
  changePassword,
  alluser,
};
