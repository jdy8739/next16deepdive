import Link from "next/link";

const MENTORS = [
  { id: "1", name: "김지훈", role: "프론트엔드 리드", tags: ["React", "Next.js"] },
  { id: "2", name: "박서연", role: "백엔드 아키텍트", tags: ["Node.js", "MCP"] },
  { id: "3", name: "최민준", role: "풀스택 개발자", tags: ["TypeScript", "AWS"] },
];

const FeedPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          Intercepting Routes
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          피드
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          멘토 카드를 클릭하면 모달((..)mentor)로 열립니다 · 새 탭/직접 접속시
          전체 페이지로 갑니다.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-3">
        {MENTORS.map((mentor) => (
          <li key={mentor.id}>
            <Link
              href={`/mentor/${mentor.id}`}
              className="block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-lg font-bold text-white">
                {mentor.name[0]}
              </div>
              <h2 className="mt-3 font-semibold text-zinc-900">{mentor.name}</h2>
              <p className="text-sm text-zinc-500">{mentor.role}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {mentor.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-xs text-zinc-400">
        피드에서 멘토 클릭 → 모달 / /feed 외 경로에서 접근 → 전체 페이지
      </p>
    </div>
  );
};

export default FeedPage;
