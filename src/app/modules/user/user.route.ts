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

export const UserRoutes = router;
