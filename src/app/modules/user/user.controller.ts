/** @format */

import { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.getAllUser();

    sendResponse(res, {
      success: true,
      message: "All users (drivers, riders) retrieved successfully",
      statusCode: httpStatusCode.OK,
      meta: result.meta,
      data: result.data,
    });
  }
);
const updateOnlineStatus = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.updateOnlineStatus(req.params.id);

    sendResponse(res, {
      success: true,
      message: "Driver is online now!",
      statusCode: httpStatusCode.OK,
      data: result.data,
    });
  }
);
const userBlocked = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.userBlocked(req.params.id);
    sendResponse(res, {
      success: true,
      message: "User is blocked now!",
      statusCode: httpStatusCode.OK,
      data: user,
    });
  }
);

export const UserContorller = {
  getAllUsers,
  updateOnlineStatus,
  userBlocked,
};
