import User, { ACCOUNT_STATUS } from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AUTH_COOKIE_NAME, verifyToken } from "../utils/token.js";

// 1) Authentication: "who are you?"
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.[AUTH_COOKIE_NAME];
  if (!token) {
    throw new AppError("Authentication required. Please log in.", 401);
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new AppError("Your session is invalid or has expired. Please log in again.", 401);
  }

  // Fresh DB check so suspended/deleted users lose access immediately.
  const user = await User.findById(payload.sub);
  if (!user) {
    throw new AppError("The account for this session no longer exists.", 401);
  }
  if (user.status !== ACCOUNT_STATUS.ACTIVE) {
    throw new AppError("Your account has been suspended.", 403);
  }

  req.user = user;
  next();
});

// 2) Authorization: "are you allowed to do this?"
// Usage: router.get("/x", protect, authorize("admin"), controller)
export const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required.", 401));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action.", 403));
    }
    next();
  };