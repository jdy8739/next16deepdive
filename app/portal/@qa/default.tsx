// default.tsx · 플랜 B — 하드 네비게이션(새로고침 F5)으로 슬롯 매칭이 깨졌을 때
// 404 없이 뼈대를 유지하는 폴백.
const QaDefault = () => {
  return (
    <div className="rounded-2xl border border-dashed border-violet-300 bg-violet-50/60 p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-base">
          💬
        </span>
        <h2 className="font-semibold text-zinc-900">Q&amp;A</h2>
        <span className="ml-auto rounded-full bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700">
          default.tsx
        </span>
      </div>
      <p className="mt-3 text-sm text-violet-700">
        슬롯 매칭이 일시적으로 해제됨 — 404 없이 뼈대 유지 중.
      </p>
    </div>
  );
};

export default QaDefault;
