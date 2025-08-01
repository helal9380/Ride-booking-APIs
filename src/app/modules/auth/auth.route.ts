/** @format */

import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { createUserZodSchema } from "../user/user.validation";
import { AuthController } from "./auth.controller";

const router = Router();
router.post(
  "/register",
  validateRequest(createUserZodSchema),
  AuthController.createUser
);
router.post("/login", AuthController.credentialsLogin);
router.post("/refresh-token", AuthController.getRefreshToken);
router.post("/logout", AuthController.logout);
router.post(
  "/reset-password",
  checkAuth(...Object.values(Role)),
  AuthController.resetPassword
);

export const AuthRoutes = router;
