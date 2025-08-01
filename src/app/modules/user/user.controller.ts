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
      message: "All users retrieved successfully",
      statusCode: httpStatusCode.OK,
      meta: result.meta,
      data: result.data,
    });
  }
);

export const UserContorller = {
  getAllUsers,
};
