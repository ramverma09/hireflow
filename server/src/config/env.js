import "dotenv/config";

const required = ["MONGODB_URI"];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
};

export const isProduction = env.nodeEnv === "production";