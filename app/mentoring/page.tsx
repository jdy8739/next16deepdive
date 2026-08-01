import Link from "next/link";
import db from "@/lib/db";

const MentoringPage = () => {
  const mentoringApplications = db.mentoringApplications;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Mentoring Applications
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {mentoringApplications.length} application
            {mentoringApplications.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/mentoring/apply"
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Apply
        </Link>
      </header>

      {mentoringApplications.length === 0 ? (
        <p className="text-center text-sm text-zinc-400">
          No mentoring applications yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {mentoringApplications.map((application) => (
            <li
              key={application.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-medium text-zinc-900">{application.name}</p>
                <p className="shrink-0 text-xs text-zinc-400">
                  {new Date(application.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mt-1 text-sm text-zinc-600">{application.subject}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default MentoringPage;
