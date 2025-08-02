/** @format */

import httpStatus from "http-status-codes";
import AppEror from "../../errorHelpers/appError";
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
const updateOnlineStatus = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppEror(httpStatus.BAD_REQUEST, "User not found!");
  }

  user.isOnline = !user.isOnline;
  await user.save();

  return {
    data: user,
  };
};
const userBlocked = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppEror(httpStatus.BAD_REQUEST, "User not found!");
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  return user;
};

export const UserService = {
  getAllUser,
  updateOnlineStatus,
  userBlocked,
};
