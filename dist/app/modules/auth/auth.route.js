"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_interface_1 = require("../user/user.interface");
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), auth_controller_1.AuthController.createUser);
router.post("/login", auth_controller_1.AuthController.credentialsLogin);
router.post("/refresh-token", auth_controller_1.AuthController.getRefreshToken);
router.post("/logout", auth_controller_1.AuthController.logout);
router.post("/reset-password", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), auth_controller_1.AuthController.resetPassword);
exports.AuthRoutes = router;
