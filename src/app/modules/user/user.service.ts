import User from './user.model';

const update = async (
  userId: string,
  payload: { name?: string; email?: string },
) => {
  await User.findByIdAndUpdate(userId, payload);

  return null;
};

export const UserService = {
  update,
};
