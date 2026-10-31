import { Link, Outlet } from "react-router";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";
import { getDashboardPath } from "../utils/roles";

export default function PublicLayout() {
  const { user } = useAuth();
  const handleLogout = useLogout();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  to={getDashboardPath(user.role)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Button variant="secondary" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}