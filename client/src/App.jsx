import { useEffect, useState } from "react";
import api from "./services/api";

function StatusRow({ label, value, ok }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          ok ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await api.get("/health");
        setHealth(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    checkHealth();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
        <h1 className="text-2xl font-bold text-indigo-600">HireFlow</h1>
        <p className="mt-1 text-sm text-gray-500">System status</p>

        <div className="mt-6 divide-y divide-gray-100">
          {loading && <p className="py-2 text-sm text-gray-500">Checking...</p>}

          {error && <StatusRow label="API" value={`Unreachable: ${error}`} ok={false} />}

          {health && (
            <>
              <StatusRow label="API" value={health.status} ok={health.status === "ok"} />
              <StatusRow
                label="Database"
                value={health.database}
                ok={health.database === "connected"}
              />
              <StatusRow label="Uptime" value={`${health.uptimeSeconds}s`} ok />
            </>
          )}
        </div>
      </div>
    </main>
  );
}