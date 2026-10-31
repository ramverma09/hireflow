import { Route, Routes } from "react-router";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicOnlyRoute from "../components/PublicOnlyRoute";
import { ROLES } from "../utils/roles";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CandidateDashboardPage from "../pages/CandidateDashboardPage";
import RecruiterDashboardPage from "../pages/RecruiterDashboardPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Candidate area */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.CANDIDATE]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="candidate/dashboard" element={<CandidateDashboardPage />} />
        </Route>
      </Route>

      {/* Recruiter area */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.RECRUITER]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="recruiter/dashboard" element={<RecruiterDashboardPage />} />
        </Route>
      </Route>

      {/* Admin area */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route element={<DashboardLayout />}>
          <Route path="admin/dashboard" element={<AdminDashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
