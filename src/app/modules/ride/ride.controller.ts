/** @format */

import { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { RideService } from "./ride.service";

const requestRide = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // console.log("user req", req.user);
    const ride = await RideService.requestRide(req, req.body);
    sendResponse(res, {
      success: true,
      message: "Ride request successfully",
      data: ride,
      statusCode: httpStatusCode.CREATED,
    });
  }
);
const cancelRide = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    await RideService.cancelRide(req);
    sendResponse(res, {
      success: true,
      message: "Ride cancel successfully",
      data: null,
      statusCode: httpStatusCode.OK,
    });
  }
);
const acceptRide = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    await RideService.acceptRide(req);
    sendResponse(res, {
      success: true,
      message: "Ride accepted successfully",
      data: null,
      statusCode: httpStatusCode.OK,
    });
  }
);
const rejectRideRequest = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    await RideService.acceptRide(req);
    sendResponse(res, {
      success: true,
      message: "Ride rejected successfully",
      data: null,
      statusCode: httpStatusCode.OK,
    });
  }
);
const updateRideStatus = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    await RideService.updateRideStatus(req);
    sendResponse(res, {
      success: true,
      message: "Ride state updated successfully",
      data: null,
      statusCode: httpStatusCode.OK,
    });
  }
);
const getMyRides = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const rides = await RideService.getMyRides(req);
    sendResponse(res, {
      success: true,
      message: "All rides retrieved successfully",
      data: rides,
      statusCode: httpStatusCode.OK,
    });
  }
);
const getDriverEarnings = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const { totalEarned, totalRides } = await RideService.getDriverEarnings(
      req
    );
    sendResponse(res, {
      success: true,
      message: "Total earned retrieved successfully",
      data: {
        totalEarned,
        totalRides,
      },
      statusCode: httpStatusCode.OK,
    });
  }
);
const getAllRides = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const rides = await RideService.getAllRides();
    sendResponse(res, {
      success: true,
      message: "All rides retrieved successfully",
      data: rides,
      statusCode: httpStatusCode.OK,
    });
  }
);
const getAssignedRides = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const rides = await RideService.getAssignedRides(req);
    sendResponse(res, {
      success: true,
      message: "All rides retrieved successfully",
      data: rides,
      statusCode: httpStatusCode.OK,
    });
  }
);
const approveDriver = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    await RideService.approveDriver(req.params.id);
    sendResponse(res, {
      success: true,
      message: "Approved successfully",
      data: null,
      statusCode: httpStatusCode.OK,
    });
  }
);

export const RideContorller = {
  requestRide,
  cancelRide,
  acceptRide,
  updateRideStatus,
  getMyRides,
  getDriverEarnings,
  getAllRides,
  approveDriver,
  getAssignedRides,
  rejectRideRequest,
};
