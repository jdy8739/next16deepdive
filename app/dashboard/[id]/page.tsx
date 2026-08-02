import { Suspense } from "react";
import EducationStats from "./EducationStats";

const DashboardDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <Suspense
        fallback={
          <div className="space-y-6">
            <div>
              <div className="h-5 w-24 animate-pulse rounded-full bg-zinc-200" />
              <div className="mt-3 h-8 w-40 animate-pulse rounded-lg bg-zinc-200" />
              <div className="mt-2 h-4 w-64 animate-pulse rounded bg-zinc-100" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100"
                />
              ))}
            </div>
          </div>
        }
      >
        <EducationStats params={params} />
      </Suspense>
    </main>
  );
};

export default DashboardDetailPage;
