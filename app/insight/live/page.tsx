interface InsightData {
  quote: string;
  servedAt: string;
}

const LiveInsightPage = async () => {
  const response = await fetch("http://localhost:3000/api/insight", {
    cache: "no-store",
  });

  const data: InsightData = await response.json();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-600" />
          Live
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          실시간 인사이트 센터
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          컴파일러 통제 (no-store) — 매 요청마다 새로운 명언이 쏟아집니다!
        </p>
      </header>

      <div className="rounded-xl border border-green-200 bg-white p-6 shadow-sm">
        <blockquote className="text-xl font-medium leading-relaxed text-zinc-900">
          “{data.quote}”
        </blockquote>
        <p className="mt-4 text-xs text-zinc-400">
          Served at {data.servedAt} (UTC)
        </p>
      </div>

      <p className="mt-6 rounded-lg bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        🏷 ƒ (Dynamic) — 새로고침(F5)할 때마다 서버가 매 요청을 동적으로 렌더링합니다.
      </p>
    </main>
  );
};

export default LiveInsightPage;
