import bcrypt from "bcrypt";
import User, { ACCOUNT_STATUS } from "../models/User.js";
import { AppError } from "../utils/AppError.js";

const SALT_ROUNDS = 12;

export async function registerUser({ firstName, lastName, email, password, role }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // If two requests race past the check above, the unique index still rejects the
  // second one (E11000) and the error handler converts it into a 409.
  return User.create({ firstName, lastName, email, passwordHash, role });
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+passwordHash");

  const isValid = user ? await user.comparePassword(password) : false;
  if (!isValid) {
    // Same message for "no such user" and "wrong password" (prevents user enumeration)
    throw new AppError("Invalid email or password", 401);
  }

  if (user.status !== ACCOUNT_STATUS.ACTIVE) {
    throw new AppError("Your account has been suspended. Please contact support.", 403);
  }

  return user;
}