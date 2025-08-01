/** @format */

import { NextFunction, Request, Response } from "express";
import httpStatus, { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppEror from "../errorHelpers/appError";
import { Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRest: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;
      if (!accessToken) {
        throw new AppEror(StatusCodes.BAD_REQUEST, "No Token recived");
      }

      const varifiedToken = verifyToken(
        accessToken,
        envVars.JWT_SECRET
      ) as JwtPayload;

      const isUserExist = await User.findOne({ email: varifiedToken.email });

      if (!isUserExist) {
        throw new AppEror(httpStatus.BAD_REQUEST, "User does't exist");
      }
      // if (
      //   !isUserExist ||
      //   isUserExist.isBlocked ||
      //   (varifiedToken.role !== Role.DRIVER && !isUserExist.approved)
      // ) {
      //   throw new AppEror(httpStatus.FORBIDDEN, "Forbidden");
      // }
      if (
        !isUserExist ||
        isUserExist.isBlocked ||
        (varifiedToken.role === Role.DRIVER && !isUserExist.approved)
      ) {
        return res.status(403).send({ message: "Forbidden" });
      }

      if (!authRest.includes(varifiedToken.role)) {
        throw new AppEror(
          StatusCodes.BAD_REQUEST,
          "You are not permited to view this route."
        );
      }

      req.user = varifiedToken;
      next();
    } catch (error) {
      next(error);
    }
  };
