import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { getDashboardPath } from "../utils/roles";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Hire smarter. Get hired faster.
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
        HireFlow connects candidates and recruiters with a clear, trackable hiring pipeline.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        {user ? (
          <Link
            to={getDashboardPath(user.role)}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </section>
  );
}