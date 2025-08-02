/** @format */

import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserContorller } from "./user.controller";
import { Role } from "./user.interface";

const router = Router();

router.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserContorller.getAllUsers
);
router.patch(
  "/:id/online",
  checkAuth(Role.DRIVER),
  UserContorller.updateOnlineStatus
);
router.patch("/:id/block", checkAuth(Role.ADMIN), UserContorller.userBlocked);

export const UserRoutes = router;
