import jwt from "jsonwebtoken";
import { env, isProduction } from "../config/env.js";

export const AUTH_COOKIE_NAME = "token";

const maxAgeMs = env.jwtExpiresDays * 24 * 60 * 60 * 1000;

// Same base options must be used when setting and clearing the cookie.
const baseCookieOptions = {
  httpOnly: true, // JavaScript cannot read it (protects against XSS token theft)
  secure: isProduction, // HTTPS only in production
  // Local dev: same-origin via Vite proxy -> "lax" is fine.
  // Production with Vercel (frontend) + Render (backend) is cross-site -> "none" + secure.
  sameSite: isProduction ? "none" : "lax",
  path: "/",
};

export function signToken(userId) {
  return jwt.sign({ sub: String(userId) }, env.jwtSecret, {
    algorithm: "HS256",
    expiresIn: env.jwtExpiresDays * 24 * 60 * 60, // seconds
  });
}

export function verifyToken(token) {
  return jwt.verify(token, env.jwtSecret, { algorithms: ["HS256"] });
}

export function setAuthCookie(res, token) {
  res.cookie(AUTH_COOKIE_NAME, token, { ...baseCookieOptions, maxAge: maxAgeMs });
}

export function clearAuthCookie(res) {
  res.clearCookie(AUTH_COOKIE_NAME, baseCookieOptions);
}