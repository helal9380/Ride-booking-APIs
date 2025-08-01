/** @format */

import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

import { RidesRoutes } from "../modules/ride/ride.routes";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/rides",
    route: RidesRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
