import { AppError } from '../../utils/appError';
import User from '../user/user.models';

const userLogin = async (id: string, password: string) => {
  const user = await User.findOne({ id });

  if (!user || !(await User.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  return user;
};

export const authService = {
  userLogin,
};
