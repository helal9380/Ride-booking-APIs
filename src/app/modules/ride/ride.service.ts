/** @format */

import httStatus from "http-status-codes";
import AppEror from "../../errorHelpers/appError";
import { Role } from "../user/user.interface";
import { User } from "../user/user.model";
import { IRequestRide, RideStatus } from "./ride.interface";
import { Ride } from "./ride.model";

const requestRide = async (req: any, payload: Partial<IRequestRide>) => {
  const { pickup, destination } = payload;
  const userId = req.user?.userId;

  const exisingRide = await Ride.findOne({
    rider: userId,
    status: {
      $in: [
        RideStatus.ACCEPTED,
        RideStatus.IN_TRANSIT,
        RideStatus.PICKED_UP,
        RideStatus.REQUESTED,
      ],
    },
  });

  if (exisingRide) {
    throw new AppEror(
      httStatus.BAD_REQUEST,
      "You already have an active ride. Complete or cancel it before requesting a new one."
    );
  }
  const ride = await Ride.create({
    rider: req.user?.userId,
    pickup,
    destination,
    status: RideStatus.REQUESTED,
    fare: Math.floor(Math.random() * 100) + 50, // mock fare
  });
  return ride;
};
const cancelRide = async (req: any) => {
  const ride = await Ride.findById(req.params.id);

  if (!ride || ride?.rider.toString() !== req.user!.userId) {
    throw new AppEror(httStatus.BAD_REQUEST, "Ride not found!");
  }

  if (ride.status !== RideStatus.REQUESTED) {
    throw new AppEror(httStatus.BAD_REQUEST, "Cannot cancel after acceptance!");
  }

  // Check cancellation window
  const now = new Date();
  const requestdTime = ride.timestamps?.requestedAt;
  const diffInMinutes = (now.getTime() - requestdTime.getTime()) / (1000 * 60);

  if (diffInMinutes > 5) {
    throw new AppEror(httStatus.BAD_REQUEST, "Cancellation window expired.");
  }

  // updated ride status (ride status canceled)
  ride.status = RideStatus.CANCELED;
  ride.timestamps.cancelledAt = new Date();
  await ride.save();
  return;
};
const acceptRide = async (req: any) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride || ride.status !== RideStatus.REQUESTED) {
    throw new AppEror(httStatus.BAD_REQUEST, "Invalid ride!");
  }
  const driver = await User.findById(req.user!.userId);

  if (!driver?.isOnline) {
    throw new AppEror(httStatus.BAD_REQUEST, "Driver must be online.");
  }
  if (driver?.isBlocked) {
    throw new AppEror(httStatus.BAD_REQUEST, "Driver is blocked by admin.");
  }

  const activeRide = await Ride.findOne({
    driver: req.user!.userId,
    status: { $nin: [RideStatus.COMPLETED, RideStatus.CANCELED] },
  });

  if (activeRide) {
    throw new AppEror(
      httStatus.BAD_REQUEST,
      "You already have an actice ride."
    );
  }

  ride.status = RideStatus.ACCEPTED;
  ride.driver = req.user!.userId;
  ride.timestamps.acceptedAt = new Date();
  await ride.save();
  return;
};
const updateRideStatus = async (req: any) => {
  const ride = await Ride.findById(req.params.id);
  if (!ride) {
    throw new AppEror(httStatus.BAD_REQUEST, "Ride not found!");
  }

  if (!ride.driver?.equals(req.user!.userId)) {
    throw new AppEror(httStatus.FORBIDDEN, "Forbidden.");
  }

  const transitions: Record<string, RideStatus> = {
    accepted: RideStatus.PICKED_UP,
    pickedUp: RideStatus.IN_TRANSIT,
    inTransit: RideStatus.COMPLETED,
  };

  const currentStatus = ride.status;
  const next = transitions[currentStatus];
  console.log("status", next, currentStatus);

  if (!next) {
    throw new AppEror(
      httStatus.BAD_REQUEST,
      "Cannot update status from current state"
    );
  }

  ride.status = next;
  ride.timestamps[`${next}At`] = new Date();
  await ride.save();
  return;
};
const getMyRides = async (req: any) => {
  const rides = await Ride.find({ rider: req.user!.userId }).sort({
    "timestamps.requestedAt": -1,
  });
  if (!rides) {
    throw new AppEror(httStatus.BAD_REQUEST, "Ride not found!");
  }
  return rides;
};

const getDriverEarnings = async (req: any) => {
  const rides = await Ride.find({
    driver: req.user!.userId,
    status: "completed",
  });
  const totalEarning = rides.reduce(
    (total, ride) => total + (ride.fare ?? 0),
    0
  );

  return {
    totalEarned: totalEarning,
    totalRides: rides.length,
  };
};
const getAllRides = async () => {
  const rides = await Ride.find().populate("rider driver", "name email role");
  return rides;
};

// approve driver
const approveDriver = async (driverId: string) => {
  const driver = await User.findById(driverId);
  if (!driver) {
    throw new AppEror(httStatus.BAD_REQUEST, "Driver not found!.");
  }

  driver.approved = !driver.approved;
  driver.role = driver.approved ? Role.DRIVER : Role.RIDER;
  await driver.save();
  return;
};

export const RideService = {
  requestRide,
  cancelRide,
  acceptRide,
  updateRideStatus,
  getMyRides,
  getDriverEarnings,
  getAllRides,
  approveDriver,
};
