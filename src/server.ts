/** @format */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { superAdmin } from "./app/utils/superAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("conected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`ride booking running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  await startServer();
  await superAdmin();
})();

// error handleing

process.on("unhandledRejection", (error) => {
  console.log("unhandleRejection error", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.log("uncaughtException error", error);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM error");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
