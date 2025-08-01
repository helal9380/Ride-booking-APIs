/** @format */

import { z } from "zod";

export const requestRideZodValidation = z.object({
  pickup: z.string().min(1, "Pickup location is required"),
  destination: z.string().min(1, "Destination is required"),
});

export const rideStatusSchema = z.object({
  status: z.enum([
    "accepted",
    "picked_up",
    "in_transit",
    "completed",
    "cancelled",
  ]),
});
