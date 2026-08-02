const PortalPage = async () => {
  // 메인 뼈대 — 0.001초 만에 준비되어 레이아웃이 즉시 등장.
  await new Promise((res) => setTimeout(res, 1));

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-2xl">
          🧭
        </div>
        <div>
          <h2 className="text-xl font-semibold text-zinc-900">
            대시보드 뼈대
          </h2>
          <p className="text-sm text-zinc-500">
            메인 콘텐츠 영역 · 0.001초에 등장
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {["총 방문", "활성 사용자", "전환율"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-zinc-100 bg-zinc-50 p-4"
          >
            <p className="text-xs font-medium text-zinc-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">—</p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-zinc-100 pt-4">
        <a
          href="/portal/settings"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
        >
          ⚙️ 포털 설정으로 이동
          <span className="text-xs text-zinc-400">
            (슬롯 미매칭 → default.tsx 플랜 B)
          </span>
        </a>
      </div>
    </div>
  );
};

export default PortalPage;
