import { USER_ROLE } from './user.constant';
import User from './user.model';
import { TUser } from './user.type';

const createAdmin = async (payload: TUser) => {
  await User.create({ ...payload, role: USER_ROLE.ADMIN });

  return null;
};

const update = async (
  userId: string,
  payload: { name?: string; email?: string },
) => {
  await User.findByIdAndUpdate(userId, payload);

  return null;
};

export const UserService = {
  createAdmin,
  update,
};
