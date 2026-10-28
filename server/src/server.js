import app from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";

async function start() {
  try {
    await connectDB();

    const server = app.listen(env.port, () => {
      console.log(`Server running on http://localhost:${env.port} [${env.nodeEnv}]`);
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Shutting down...`);
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

start();