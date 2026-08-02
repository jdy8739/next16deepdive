import { Suspense } from "react";
import SuggestionList from "./SuggestionList";

// NOTE(cacheComponents): `params` 는 uncached runtime data 로 취급된다.
// 부모에서 await 하지 않고 Promise 그대로 자식에게 넘겨, 자식(<Suspense> 보호 구간)이
// 해제하도록 하는 "방호벽" 패턴이다.
const BoardPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <Suspense
        fallback={
          <div className="space-y-3">
            <div className="h-8 w-40 animate-pulse rounded-lg bg-zinc-200" />
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-16 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100"
              />
            ))}
          </div>
        }
      >
        <SuggestionList params={params} />
      </Suspense>
    </main>
  );
};

export default BoardPage;
