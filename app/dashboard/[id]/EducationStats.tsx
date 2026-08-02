"use cache";

import { cacheLife } from "next/cache";

const EducationStats = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  cacheLife("minutes");

  const { id } = await params;

  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  const stats = [
    { label: "수강률", value: "87%", tone: "text-zinc-900" },
    { label: "평균 점수", value: "91", tone: "text-zinc-900" },
    { label: "완료 코스", value: "14", tone: "text-zinc-900" },
    { label: "진행 중 코스", value: "3", tone: "text-zinc-900" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
          캐시됨 · cacheLife(&quot;minutes&quot;)
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          교육 통계
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          코스 ID <span className="font-mono font-medium text-zinc-700">{id}</span> 의
          학습 현황입니다.
        </p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <dt className="text-sm font-medium text-zinc-500">{stat.label}</dt>
            <dd className={`mt-2 text-3xl font-bold ${stat.tone}`}>
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-zinc-500">진행률</p>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full w-[72%] rounded-full bg-blue-600" />
        </div>
        <p className="mt-2 text-xs text-zinc-400">72% 완료</p>
      </div>
    </div>
  );
};

export default EducationStats;
