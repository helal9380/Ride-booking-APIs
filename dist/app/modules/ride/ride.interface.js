"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideStatus = void 0;
// interfaces/ride.interface.ts
var RideStatus;
(function (RideStatus) {
    RideStatus["REQUESTED"] = "requested";
    RideStatus["ACCEPTED"] = "accepted";
    RideStatus["PICKED_UP"] = "pickedUp";
    RideStatus["IN_TRANSIT"] = "inTransit";
    RideStatus["COMPLETED"] = "completed";
    RideStatus["CANCELED"] = "cancelled";
})(RideStatus || (exports.RideStatus = RideStatus = {}));
