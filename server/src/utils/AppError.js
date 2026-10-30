// Custom error for "expected" failures (wrong password, not found, forbidden...).
// statusCode tells the error handler which HTTP status to send.
export class AppError extends Error {
  constructor(message, statusCode = 500, errors = undefined) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors; // optional field-level details (validation)
    Error.captureStackTrace?.(this, this.constructor);
  }
}