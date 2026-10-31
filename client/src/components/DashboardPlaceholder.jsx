import { useAuth } from "../hooks/useAuth";

// Temporary content. Real dashboards come in later milestones.
export default function DashboardPlaceholder({ title }) {
  const { user } = useAuth();

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Real dashboard widgets will be added in a later milestone.
      </p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Name</dt>
          <dd className="mt-1 text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Email</dt>
          <dd className="mt-1 text-sm font-medium text-gray-900">{user.email}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-400">Role</dt>
          <dd className="mt-1 text-sm font-medium capitalize text-gray-900">{user.role}</dd>
        </div>
      </dl>
    </div>
  );
}