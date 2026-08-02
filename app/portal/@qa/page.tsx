const QaPage = async () => {
  // Q&A 슬롯 — 2초 후 등장. 알림(1s)과 서로 전혀 기다리지 않는다.
  await new Promise((res) => setTimeout(res, 2000));

  const qa = [
    { id: "q1", q: "병렬 라우트의 로딩은 진짜 독립인가요?", a: "네, 각 슬롯은 자기만의 loading.tsx 로 스트리밍됩니다." },
    { id: "q2", q: "cacheComponents 에서도 동작하나요?", a: "슬롯별 Suspense 스트리밍이라 동일하게 동작합니다." },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-base">
          💬
        </span>
        <h2 className="font-semibold text-zinc-900">Q&amp;A</h2>
        <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
          2s
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {qa.map((item) => (
          <li key={item.id} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
            <p className="text-sm font-medium text-zinc-800">Q. {item.q}</p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              A. {item.a}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QaPage;
