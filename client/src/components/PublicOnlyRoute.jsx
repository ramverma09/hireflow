import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { getDashboardPath } from "../utils/roles";
import FullPageSpinner from "./FullPageSpinner";

// For /login and /register: already logged-in users should not see them.
export default function PublicOnlyRoute() {
  const { user, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <FullPageSpinner />;
  }

  if (user) {
    const destination = location.state?.from?.pathname || getDashboardPath(user.role);
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
