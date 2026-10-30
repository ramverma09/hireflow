import { isProduction } from "../config/env.js";

// Express recognises an error handler by its 4 parameters. Do not remove "next".
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message;
  let errors = err.errors;

  if (err.name === "ValidationError") {
    // Mongoose schema validation
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  } else if (err.name === "CastError") {
    // e.g. invalid ObjectId in a URL
    statusCode = 400;
    message = `Invalid value for ${err.path}`;
  } else if (err.code === 11000) {
    // MongoDB duplicate key
    statusCode = 409;
    const field = Object.keys(err.keyPattern || {})[0] || "field";
    message = `A record with this ${field} already exists`;
  } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Your session is invalid or has expired. Please log in again.";
  } else if (err.type === "entity.parse.failed") {
    // Malformed JSON body
    statusCode = 400;
    message = "Request body contains invalid JSON";
  }

  if (statusCode >= 500) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 && isProduction ? "Internal server error" : message,
    ...(errors ? { errors } : {}),
    ...(isProduction ? {} : { stack: err.stack }),
  });
}