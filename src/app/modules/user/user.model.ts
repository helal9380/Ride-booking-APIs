/** @format */

import { model, Schema } from "mongoose";
import { IAuthProvider, IUser, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>(
  {
    providerId: { type: String, required: true },
    provider: { type: String, required: true },
  },
  { _id: false, versionKey: false }
);

const userSchema = new Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: Object.values(Role),
    default: Role.RIDER,
  },
  isBlocked: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  isOnline: { type: Boolean, default: false },
  auths: [authProviderSchema],
});

// pre hook

export const User = model<IUser>("User", userSchema);
