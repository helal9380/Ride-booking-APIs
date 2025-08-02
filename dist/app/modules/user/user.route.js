"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_controller_1 = require("./user.controller");
const user_interface_1 = require("./user.interface");
const router = (0, express_1.Router)();
router.get("/", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), user_controller_1.UserContorller.getAllUsers);
router.patch("/:id/online", (0, checkAuth_1.checkAuth)(user_interface_1.Role.DRIVER), user_controller_1.UserContorller.updateOnlineStatus);
router.patch("/:id/block", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN), user_controller_1.UserContorller.userBlocked);
exports.UserRoutes = router;
