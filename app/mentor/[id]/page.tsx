import { Suspense } from "react";
import MentorCard from "./MentorCard";

const MentorPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Suspense
        fallback={
          <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-8">
            <div className="flex items-start gap-5">
              <div className="h-20 w-20 rounded-2xl bg-zinc-200" />
              <div className="flex-1 space-y-2">
                <div className="h-6 w-32 rounded bg-zinc-200" />
                <div className="h-4 w-24 rounded bg-zinc-100" />
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <div className="h-6 w-16 rounded-full bg-zinc-100" />
              <div className="h-6 w-16 rounded-full bg-zinc-100" />
              <div className="h-6 w-16 rounded-full bg-zinc-100" />
            </div>
            <div className="mt-5 h-20 rounded-xl bg-zinc-100" />
          </div>
        }
      >
        <MentorCard params={params} />
      </Suspense>
    </div>
  );
};

export default MentorPage;
