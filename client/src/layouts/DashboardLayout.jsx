import { Outlet } from "react-router";
import Logo from "../components/Logo";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

export default function DashboardLayout() {
  const { user } = useAuth();
  const handleLogout = useLogout();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs capitalize text-gray-500">{user.role}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}