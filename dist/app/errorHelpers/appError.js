"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
class AppEror extends Error {
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.default = AppEror;
