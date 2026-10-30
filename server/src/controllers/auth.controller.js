import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { signToken, setAuthCookie, clearAuthCookie } from "../utils/token.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);
  setAuthCookie(res, signToken(user._id));

  res.status(201).json({ success: true, data: { user } });
});

export const login = asyncHandler(async (req, res) => {
  const user = await loginUser(req.body);
  setAuthCookie(res, signToken(user._id));

  res.status(200).json({ success: true, data: { user } });
});

export const logout = (req, res) => {
  clearAuthCookie(res);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const getMe = (req, res) => {
  // req.user is attached by the protect middleware
  res.status(200).json({ success: true, data: { user: req.user } });
};