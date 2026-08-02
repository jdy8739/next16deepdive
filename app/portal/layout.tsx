import { Suspense } from "react";

// 병렬 라우트(Parallel Routes): children + @notifications + @qa 슬롯을 나란히 렌더.
// 각 슬롯은 자기만의 loading.tsx 를 가지므로 "서로 전혀 기다리지 않고" 독립 로딩된다.
// 메인 뼈대(children)는 0.001초에 즉시, 알림은 1초, Q&A 는 2초 뒤 각자 깨어난다.
export default function PortalLayout({
  children,
  notifications,
  qa,
}: {
  children: React.ReactNode;
  notifications: React.ReactNode;
  qa: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          parallel routes · 독립 로딩
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          최초 접속 포털
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          메인 뼈대(0.001s) → 알림(1s) → Q&amp;A(2s). 각 슬롯은 서로 기다리지
          않는다.
        </p>
      </header>

      {/* 메인 대시보드 — 가장 먼저 준비(0.001초) */}
      <section className="mb-8">
        {children}
      </section>

      {/* 병렬 슬롯 2개 — 각자 독립 로딩 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Suspense fallback={null}>
          <section className="@container">{notifications}</section>
        </Suspense>
        <Suspense fallback={null}>
          <section className="@container">{qa}</section>
        </Suspense>
      </div>
    </div>
  );
}
