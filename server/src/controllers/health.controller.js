import mongoose from "mongoose";

const DB_STATES = {
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
};

export function getHealth(req, res) {
  const dbState = DB_STATES[mongoose.connection.readyState] || "unknown";

  res.status(200).json({
    success: true,
    data: {
      status: "ok",
      database: dbState,
      uptimeSeconds: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  });
}