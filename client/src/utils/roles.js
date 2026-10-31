export const ROLES = Object.freeze({
  CANDIDATE: "candidate",
  RECRUITER: "recruiter",
  ADMIN: "admin",
});

export const DASHBOARD_PATHS = Object.freeze({
  [ROLES.CANDIDATE]: "/candidate/dashboard",
  [ROLES.RECRUITER]: "/recruiter/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
});

export function getDashboardPath(role) {
  return DASHBOARD_PATHS[role] || "/";
}
