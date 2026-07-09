import { searchRoutes } from "@/services/searchRoutes";

interface Props {
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
}

export default async function ResultsPage({ searchParams }: Props) {
  const params = await searchParams;

  const from = params.from ?? "";
  const to = params.to ?? "";

  const routes = searchRoutes(from, to);

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold">
          {from} → {to}
        </h1>

        <p className="text-slate-500 mt-2">
          {routes.length} route(s) found
        </p>

        <div className="mt-8 space-y-6">

          {routes.length === 0 && (
            <div className="rounded-xl border bg-white p-8">
              No route found.
            </div>
          )}

          {routes.map((route) => (
            <div
              key={route.id}
              className="rounded-2xl bg-white border p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {route.from} → {route.to}
              </h2>

              <p className="mt-3">
                <strong>Transport:</strong>{" "}
                {route.transport.join(", ")}
              </p>

              <p>
                <strong>Fare:</strong> ₦{route.fare}
              </p>

              <p>
                <strong>Duration:</strong> {route.duration} mins
              </p>

              <p>
                <strong>Traffic:</strong> {route.traffic}
              </p>

              <p>
                <strong>Safety:</strong> {route.safety}
              </p>

              <p className="mt-4">
                <strong>Route</strong>
              </p>

              <ul className="list-disc ml-6 mt-2">
                {route.route.map((stop) => (
                  <li key={stop}>{stop}</li>
                ))}
              </ul>

            </div>
          ))}

        </div>

      </div>
    </main>
  );
}