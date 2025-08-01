/** @format */
import { Types } from "mongoose";
// interfaces/ride.interface.ts

export enum RideStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  PICKED_UP = "pickedUp",
  IN_TRANSIT = "inTransit",
  COMPLETED = "completed",
  CANCELED = "cancelled",
}
type TimestampKey =
  | "requestedAt"
  | "acceptedAt"
  | "pickedUpAt"
  | "inTransitAt"
  | "completedAt"
  | "cancelledAt";
export interface IRide {
  rider: Types.ObjectId;
  driver?: Types.ObjectId;
  pickup: string;
  destination: string;
  status: RideStatus;
  timestamps: {
    requestedAt: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    inTransitAt?: Date;
    completedAt?: Date;
    cancelledAt?: Date;
  };
  fare?: number;
}
export interface ILocation {
  lat: number;
  lng: number;
}

export interface IRequestRide {
  pickup: ILocation;
  destination: ILocation;
}
