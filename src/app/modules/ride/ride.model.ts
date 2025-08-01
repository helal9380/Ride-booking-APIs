/** @format */

import { model, Schema } from "mongoose";
import { IRide, RideStatus } from "./ride.interface";

const rideSchema = new Schema<IRide>({
  rider: { type: Schema.Types.ObjectId, ref: "User", required: true },
  driver: { type: Schema.Types.ObjectId, ref: "User" },
  pickup: { type: String, required: true },
  destination: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(RideStatus),
    default: RideStatus.REQUESTED,
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

export const Ride = model<IRide>("Ride", rideSchema);
