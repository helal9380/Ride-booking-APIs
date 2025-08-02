"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const rideSchema = new mongoose_1.Schema({
    rider: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    driver: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(ride_interface_1.RideStatus),
        default: ride_interface_1.RideStatus.REQUESTED,
    },
    timestamps: {
        requestedAt: { type: Date, default: Date.now },
        acceptedAt: Date,
        pickedUpAt: Date,
        inTransitAt: Date,
        completedAt: Date,
        cancelledAt: Date,
    },
    fare: { type: Number, default: 0 },
});
exports.Ride = (0, mongoose_1.model)("Ride", rideSchema);
