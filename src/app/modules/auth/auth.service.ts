/** @format */

import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppEror from "../../errorHelpers/appError";
import {
  createNewAccessTokenWithRefreshToken,
  getUserToken,
} from "../../utils/getUserToken";
import { IAuthProvider, IUser } from "../user/user.interface";
import { User } from "../user/user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    throw new AppEror(httpStatus.BAD_REQUEST, "User already exist!");
  }

  const passwordHash = await bcryptjs.hash(
    password as string,
    Number(envVars.JWT_SALT_ROUND)
  );

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };
  const user = await User.create({
    email,
    password: passwordHash,
    auths: [authProvider],
    ...rest,
  });

  return user;
};
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppEror(httpStatus.BAD_REQUEST, "Email does't exist");
  }
  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist?.password as string
  );
  if (!isPasswordMatched) {
    throw new AppEror(httpStatus.BAD_GATEWAY, "Incorrect password");
  }

  const { accessToken, refreshToken } = getUserToken(isUserExist);

  return {
    accessToken,
    refreshToken,
    user: isUserExist,
  };
};
const getRefreshToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};
const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);

  const isOldPasswordMatch = await bcryptjs.compare(
    oldPassword,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    user!.password as string
  );
  if (!isOldPasswordMatch) {
    throw new AppEror(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  user!.password = await bcryptjs.hash(
    newPassword,
    Number(envVars.JWT_SALT_ROUND)
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  user!.save();
};
export const AuthServices = {
  createUser,
  credentialsLogin,
  getRefreshToken,
  resetPassword,
};
