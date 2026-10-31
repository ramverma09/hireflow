import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { getDashboardPath } from "../utils/roles";

export default function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-5xl font-bold text-indigo-600">403</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Access denied</h1>
      <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
      <Link
        to={user ? getDashboardPath(user.role) : "/"}
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        {user ? "Back to my dashboard" : "Back to home"}
      </Link>
    </section>
  );
}