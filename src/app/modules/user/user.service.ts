/** @format */

import { User } from "./user.model";

const getAllUser = async () => {
  const users = await User.find({});

  const total = await User.countDocuments();

  return {
    data: users,
    meta: {
      total,
    },
  };
};

export const UserService = {
  getAllUser,
};
