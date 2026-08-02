import Link from "next/link";

const MENTORS: Record<string, { name: string; role: string; level: string; tags: string[]; bio: string }> = {
  "1": { name: "김지훈", role: "프론트엔드 리드", level: "시니어", tags: ["React", "Next.js", "성능최적화"], bio: "12년차. 대규모 SPA와 캐시 전략에 강합니다." },
  "2": { name: "박서연", role: "백엔드 아키텍트", level: "시니어", tags: ["Node.js", "DB 설계", "MCP"], bio: "마이크로서비스와 API 설계 전문가입니다." },
  "3": { name: "최민준", role: "풀스택 개발자", level: "미들", tags: ["TypeScript", "Next", "AWS"], bio: "빠른 프로토타이핑과 배포 자동화를 좋아합니다." },
};

const MentorCard = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const mentor = MENTORS[id] ?? MENTORS["1"];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <Link
        href="/feed"
        className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
      >
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        피드로 돌아가기
      </Link>

      <div className="flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-3xl font-bold text-white">
          {mentor.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              {mentor.name}
            </h1>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700">
              {mentor.level}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">{mentor.role}</p>
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500">
          멘토 #{id}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="mt-5 rounded-xl bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
        {mentor.bio}
      </p>
    </div>
  );
};

export default MentorCard;
