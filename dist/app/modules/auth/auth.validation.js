"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
// modules/auth/auth.validation.ts
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(["rider", "driver", "admin"]),
});
