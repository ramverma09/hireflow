import { AppError } from "../utils/AppError.js";

// Usage: router.post("/x", validate(schema), controller)
// On success req.body is REPLACED with the parsed data, so unknown fields are dropped.
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body ?? {});

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return next(new AppError("Validation failed", 400, errors));
  }

  req.body = result.data;
  next();
};