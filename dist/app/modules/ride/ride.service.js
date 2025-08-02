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
exports.RideService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const user_interface_1 = require("../user/user.interface");
const user_model_1 = require("../user/user.model");
const ride_interface_1 = require("./ride.interface");
const ride_model_1 = require("./ride.model");
const requestRide = (req, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { pickup, destination } = payload;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    const exisingRide = yield ride_model_1.Ride.findOne({
        rider: userId,
        status: {
            $in: [
                ride_interface_1.RideStatus.ACCEPTED,
                ride_interface_1.RideStatus.IN_TRANSIT,
                ride_interface_1.RideStatus.PICKED_UP,
                ride_interface_1.RideStatus.REQUESTED,
            ],
        },
    });
    if (exisingRide) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "You already have an active ride. Complete or cancel it before requesting a new one.");
    }
    const ride = yield ride_model_1.Ride.create({
        rider: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId,
        pickup,
        destination,
        status: ride_interface_1.RideStatus.REQUESTED,
        fare: Math.floor(Math.random() * 100) + 50, // mock fare
    });
    return ride;
});
const cancelRide = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.Ride.findById(req.params.id);
    if (!ride || (ride === null || ride === void 0 ? void 0 : ride.rider.toString()) !== req.user.userId) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Ride not found!");
    }
    if (ride.status !== ride_interface_1.RideStatus.REQUESTED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Cannot cancel after acceptance!");
    }
    // Check cancellation window
    const now = new Date();
    const requestdTime = (_a = ride.timestamps) === null || _a === void 0 ? void 0 : _a.requestedAt;
    const diffInMinutes = (now.getTime() - requestdTime.getTime()) / (1000 * 60);
    if (diffInMinutes > 5) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Cancellation window expired.");
    }
    // updated ride status (ride status canceled)
    ride.status = ride_interface_1.RideStatus.CANCELED;
    ride.timestamps.cancelledAt = new Date();
    yield ride.save();
    return;
});
const acceptRide = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const ride = yield ride_model_1.Ride.findById(req.params.id);
    if (!ride || ride.status !== ride_interface_1.RideStatus.REQUESTED) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid ride or ride not found!");
    }
    const driver = yield user_model_1.User.findById(req.user.userId);
    if (!driver ||
        driver.role !== user_interface_1.Role.DRIVER ||
        !driver.approved ||
        !driver.isOnline) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not allowed to accept this ride.");
    }
    if (ride.status !== "requested") {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Ride already accepted or unavailable.");
    }
    const activeRide = yield ride_model_1.Ride.findOne({
        driver: req.user.userId,
        status: { $nin: [ride_interface_1.RideStatus.COMPLETED, ride_interface_1.RideStatus.CANCELED] },
    });
    if (activeRide) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "You already have an actice ride.");
    }
    ride.status = ride_interface_1.RideStatus.ACCEPTED;
    ride.driver = req.user.userId;
    ride.timestamps.acceptedAt = new Date();
    yield ride.save();
    return;
});
const updateRideStatus = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const ride = yield ride_model_1.Ride.findById(req.params.id);
    if (!ride) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Ride not found!");
    }
    if (!((_a = ride.driver) === null || _a === void 0 ? void 0 : _a.equals(req.user.userId))) {
        throw new appError_1.default(http_status_codes_1.default.FORBIDDEN, "Forbidden.");
    }
    const transitions = {
        accepted: ride_interface_1.RideStatus.PICKED_UP,
        pickedUp: ride_interface_1.RideStatus.IN_TRANSIT,
        inTransit: ride_interface_1.RideStatus.COMPLETED,
    };
    const currentStatus = ride.status;
    const next = transitions[currentStatus];
    console.log("status", next, currentStatus);
    if (!next) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Cannot update status from current state");
    }
    ride.status = next;
    ride.timestamps[`${next}At`] = new Date();
    yield ride.save();
    return;
});
const getMyRides = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({ rider: req.user.userId }).sort({
        "timestamps.requestedAt": -1,
    });
    if (!rides) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Ride not found!");
    }
    return rides;
});
const getAssignedRides = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const driverId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
    if (!driverId) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "No driver found!");
    }
    const rides = yield ride_model_1.Ride.find({
        driver: driverId,
        status: {
            $in: [
                ride_interface_1.RideStatus.ACCEPTED,
                ride_interface_1.RideStatus.PICKED_UP,
                ride_interface_1.RideStatus.IN_TRANSIT,
                ride_interface_1.RideStatus.COMPLETED,
            ],
        },
    });
    if (!rides) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Not ride found!");
    }
    return rides;
});
const getDriverEarnings = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find({
        driver: req.user.userId,
        status: "completed",
    });
    const totalEarning = rides.reduce((total, ride) => { var _a; return total + ((_a = ride.fare) !== null && _a !== void 0 ? _a : 0); }, 0);
    return {
        totalEarned: totalEarning,
        totalRides: rides.length,
    };
});
const getAllRides = () => __awaiter(void 0, void 0, void 0, function* () {
    const rides = yield ride_model_1.Ride.find().populate("rider driver", "name email role");
    return rides;
});
// approve driver
const approveDriver = (driverId) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield user_model_1.User.findById(driverId);
    if (!driver) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Driver not found!.");
    }
    driver.approved = !driver.approved;
    driver.role = driver.approved ? user_interface_1.Role.DRIVER : user_interface_1.Role.RIDER;
    yield driver.save();
    return;
});
exports.RideService = {
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
