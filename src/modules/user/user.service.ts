import { TUser } from './user.interface';
import { User } from './user.model';

const creatAdmin = async (payload: TUser) => {
  if (payload.role == 'admin') {
    const result = await User.create(payload);
    return result;
  }
};
export const userService = {
  creatAdmin,
};
