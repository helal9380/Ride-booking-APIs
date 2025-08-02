"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const catchAsync_1 = require("../../utils/catchAsync");
const getUserToken_1 = require("../../utils/getUserToken");
const sendResponse_1 = require("../../utils/sendResponse");
const setToken_1 = require("../../utils/setToken");
const auth_service_1 = require("./auth.service");
const createUser = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.AuthServices.createUser(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User create successfully",
        data: user,
        statusCode: http_status_codes_1.default.CREATED,
    });
}));
const credentialsLogin = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const loginInfo = yield auth_service_1.AuthServices.credentialsLogin(req.body);
    (0, setToken_1.setAuthCookie)(res, loginInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User login successfully",
        data: loginInfo,
        statusCode: http_status_codes_1.default.CREATED,
    });
}));
const getRefreshToken = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "No refresh token reciev fron cookies!");
    }
    const loginInfo = yield auth_service_1.AuthServices.getRefreshToken(refreshToken);
    (0, setToken_1.setAuthCookie)(res, loginInfo);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User login successfully",
        data: loginInfo,
        statusCode: http_status_codes_1.default.CREATED,
    });
}));
const logout = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "User logout successfully",
        data: null,
        statusCode: http_status_codes_1.default.OK,
    });
}));
const resetPassword = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user;
    yield auth_service_1.AuthServices.resetPassword(oldPassword, newPassword, decodedToken);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: http_status_codes_1.default.OK,
        message: "Password Changed Successfully",
        data: null,
    });
}));
const googleCallback = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    if (!user) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "User not found!");
    }
    const tokenInfo = (0, getUserToken_1.getUserToken)(user);
    (0, setToken_1.setAuthCookie)(res, tokenInfo);
    res.redirect(`${env_1.envVars.FRONTEND_URL}/${redirectTo}`);
}));
exports.AuthController = {
    createUser,
    credentialsLogin,
    getRefreshToken,
    logout,
    resetPassword,
    googleCallback,
};
