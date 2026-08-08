import { Suspense } from "react";
import WriteContent from "./WriteContent";

// NOTE(cacheComponents): `params` 는 uncached runtime data 로 취급된다.
// 부모에서 await 하지 않고 Promise 그대로 자식(<WriteContent>)에게 넘겨,
// <Suspense> 보호 구간 안에서 해제하도록 한다 ("방호벽" 패턴).
const WritePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <Suspense
        fallback={
          <div className="h-64 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100" />
        }
      >
        <WriteContent params={params} />
      </Suspense>
    </main>
  );
};

export default WritePage;
