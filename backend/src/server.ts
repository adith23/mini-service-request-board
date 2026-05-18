import type { Server } from "node:http";

import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";
import { config } from "./config/index.js";

let server: Server | undefined;

async function startServer(): Promise<void> {
  await connectDatabase();

  server = app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  console.log(`${signal} received. Shutting down gracefully.`);

  if (server) {
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });

    return;
  }

  await disconnectDatabase();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception", error);
  process.exit(1);
});

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
