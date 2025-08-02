"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    providerId: { type: String, required: true },
    provider: { type: String, required: true },
}, { _id: false, versionKey: false });
const userSchema = new mongoose_1.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.RIDER,
    },
    isBlocked: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false },
    auths: [authProviderSchema],
});
// pre hook
exports.User = (0, mongoose_1.model)("User", userSchema);
