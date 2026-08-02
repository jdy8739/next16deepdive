export const dynamic = "force-dynamic";

interface ExchangeData {
  base: string;
  quote: string;
  rate: number;
  updatedAt: string;
}

const ExchangePage = async () => {
  const response = await fetch("http://localhost:3000/api/exchange", {
    next: { revalidate: 10 },
  });

  const data: ExchangeData = await response.json();

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-600" />
          revalidate: 10s
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          실시간 환율
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          SWR — 10초 TTL. 낡은(stale) 값이 먼저 보이고 뒤에서 조용히 갱신됩니다.
        </p>
      </header>

      <section className="rounded-xl border border-teal-200 bg-white p-6 shadow-sm">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-medium text-zinc-400">USD → KRW</span>
          <span className="text-4xl font-bold text-zinc-900">{data.rate}</span>
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          서버 렌더 기준 · updated at {data.updatedAt}
        </p>
      </section>

      <p className="mt-6 rounded-lg bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
        🏷 재검증 시점(10초 경과 후 새로고침): 서버 렌더 시 이전 값(Stale)이 먼저
        반환되고, 데이터 캐시가 배경에서 새 값으로 몰래 갱신(Revalidate)됩니다.
      </p>
    </main>
  );
};

export default ExchangePage;
