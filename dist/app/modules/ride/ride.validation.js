"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideStatusSchema = exports.requestRideZodValidation = void 0;
const zod_1 = require("zod");
exports.requestRideZodValidation = zod_1.z.object({
    pickup: zod_1.z.string().min(1, "Pickup location is required"),
    destination: zod_1.z.string().min(1, "Destination is required"),
});
exports.rideStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "accepted",
        "picked_up",
        "in_transit",
        "completed",
        "cancelled",
    ]),
});
