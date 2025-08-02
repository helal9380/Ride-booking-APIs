/** @format */

import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { RideContorller } from "./ride.controller";
import { requestRideZodValidation } from "./ride.validation";

const router = Router();

router.post(
  "/request",
  checkAuth(Role.RIDER),
  validateRequest(requestRideZodValidation),
  RideContorller.requestRide
);
router.get("/me", checkAuth(Role.RIDER), RideContorller.getMyRides);
router.get("/rides", checkAuth(Role.DRIVER), RideContorller.getAssignedRides);
router.get("/", checkAuth(Role.ADMIN), RideContorller.getAllRides);
router.get(
  "/earnings",
  checkAuth(Role.DRIVER),
  RideContorller.getDriverEarnings
);
router.patch(
  "/:id/cancel",
  checkAuth(Role.RIDER),

  RideContorller.cancelRide
);
router.patch("/:id/accept", checkAuth(Role.DRIVER), RideContorller.acceptRide);
router.patch(
  "/:id/reject",
  checkAuth(Role.DRIVER),
  RideContorller.rejectRideRequest
);
router.patch(
  "/:id/approve",
  checkAuth(Role.ADMIN),
  RideContorller.approveDriver
);
router.patch(
  "/:id/status",
  checkAuth(Role.DRIVER),
  RideContorller.updateRideStatus
);

export const RidesRoutes = router;
