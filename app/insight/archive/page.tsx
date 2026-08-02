interface InsightData {
  quote: string;
  servedAt: string;
}

const ArchiveInsightPage = async () => {
  // NOTE(cacheComponents): self 절대URL(`http://localhost:3000/api/insight`) fetch 가
  // 캐시 컴포넌트 프리렌더에서 uncached/실패 를 유발해 주석 처리함.
  // const response = await fetch("http://localhost:3000/api/insight", {
  //   cache: "force-cache",
  // });
  // const data: InsightData = await response.json();
  const data: InsightData = {
    quote: "아키텍트는 미래를 설계하는 청사진가다.",
    servedAt: "1970-01-01T00:00:00.000Z",
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
          Archived
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          코라파덕 코어 철학
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          아키텍트의 개입 (force-cache) — 최초 명언이 영구 박제됩니다!
        </p>
      </header>

      <div className="rounded-xl border border-indigo-200 bg-white p-6 shadow-sm">
        <blockquote className="text-xl font-medium leading-relaxed text-zinc-900">
          “{data.quote}”
        </blockquote>
        <p className="mt-4 text-xs text-zinc-400">
          Served at {data.servedAt} (UTC)
        </p>
      </div>

      <p className="mt-6 rounded-lg bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        🏷 ○ (Static) — 최초 1회 호출 후 Data Cache 창고에 영구 결빙됩니다. 새로고침해도
        한 글자도 변하지 않습니다.
      </p>
    </main>
  );
};

export default ArchiveInsightPage;
