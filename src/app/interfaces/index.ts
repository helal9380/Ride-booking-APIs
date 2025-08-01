/** @format */

import { JwtPayload } from "jsonwebtoken";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
// declare namespace Express {
//   export interface Request {
//     user?: { id: string; role: string };
//   }
// }
