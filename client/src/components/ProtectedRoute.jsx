import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import FullPageSpinner from "./FullPageSpinner";

// Usage: <Route element={<ProtectedRoute allowedRoles={["recruiter"]} />}> ...children... </Route>
export default function ProtectedRoute({ allowedRoles }) {
  const { user, isInitialized } = useAuth();
  const location = useLocation();

  // Wait for the first /auth/me check, otherwise logged-in users get bounced on refresh.
  if (!isInitialized) {
    return <FullPageSpinner />;
  }

  if (!user) {
    // Remember where the user wanted to go, so we can return there after login.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}