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
exports.RideContorller = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const ride_service_1 = require("./ride.service");
const requestRide = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("user req", req.user);
    const ride = yield ride_service_1.RideService.requestRide(req, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Ride request successfully",
        data: ride,
        statusCode: http_status_codes_1.default.CREATED,
    });
}));
const cancelRide = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield ride_service_1.RideService.cancelRide(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Ride cancel successfully",
        data: null,
        statusCode: http_status_codes_1.default.OK,
    });
}));
const acceptRide = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield ride_service_1.RideService.acceptRide(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Ride accepted successfully",
        data: null,
        statusCode: http_status_codes_1.default.OK,
    });
}));
const updateRideStatus = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield ride_service_1.RideService.updateRideStatus(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Ride state updated successfully",
        data: null,
        statusCode: http_status_codes_1.default.OK,
    });
}));
const getMyRides = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_service_1.RideService.getMyRides(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "All rides retrieved successfully",
        data: rides,
        statusCode: http_status_codes_1.default.OK,
    });
}));
const getDriverEarnings = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { totalEarned, totalRides } = yield ride_service_1.RideService.getDriverEarnings(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Total earned retrieved successfully",
        data: {
            totalEarned,
            totalRides,
        },
        statusCode: http_status_codes_1.default.OK,
    });
}));
const getAllRides = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_service_1.RideService.getAllRides();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "All rides retrieved successfully",
        data: rides,
        statusCode: http_status_codes_1.default.OK,
    });
}));
const getAssignedRides = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_service_1.RideService.getAssignedRides(req);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "All rides retrieved successfully",
        data: rides,
        statusCode: http_status_codes_1.default.OK,
    });
}));
const approveDriver = (0, catchAsync_1.catchAsync)(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield ride_service_1.RideService.approveDriver(req.params.id);
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        message: "Approved successfully",
        data: null,
        statusCode: http_status_codes_1.default.OK,
    });
}));
exports.RideContorller = {
    requestRide,
    cancelRide,
    acceptRide,
    updateRideStatus,
    getMyRides,
    getDriverEarnings,
    getAllRides,
    approveDriver,
    getAssignedRides,
};
