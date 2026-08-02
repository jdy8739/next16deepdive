import Link from "next/link";
import MentorModalClose from "./MentorModalClose";

const MENTORS: Record<string, { name: string; role: string; level: string; tags: string[]; bio: string }> = {
  "1": { name: "김지훈", role: "프론트엔드 리드", level: "시니어", tags: ["React", "Next.js", "성능최적화"], bio: "12년차. 대규모 SPA와 캐시 전략에 강합니다." },
  "2": { name: "박서연", role: "백엔드 아키텍트", level: "시니어", tags: ["Node.js", "DB 설계", "MCP"], bio: "마이크로서비스와 API 설계 전문가입니다." },
  "3": { name: "최민준", role: "풀스택 개발자", level: "미들", tags: ["TypeScript", "Next", "AWS"], bio: "빠른 프로토타이핑과 배포 자동화를 좋아합니다." },
};

// 인터셉트 라우트 `(..)mentor/[id]` — 네이티브 <dialog> 모달.
// Tailwind preflight 가 <dialog> 기본(중앙 fixed)을 리셋하므로, `fixed inset-0 m-auto`
// 로 명시해 화면 중앙에 띄우고 ::backdrop 으로 dim 처리한다. 닫기 ✕ 는 우상단 절대 고정.
const MentorModal = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const mentor = MENTORS[id] ?? MENTORS["1"];

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-auto h-max w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl"
    >
      <div className="absolute right-4 top-4">
        <MentorModalClose />
      </div>

      <div className="flex items-start gap-4 pr-10">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-xl font-bold text-white">
          {mentor.name[0]}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-zinc-900">
              {mentor.name}
            </h2>
            <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
              {mentor.level}
            </span>
          </div>
          <p className="text-sm text-zinc-500">{mentor.role}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {mentor.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-medium text-zinc-600"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="mt-4 rounded-xl bg-zinc-50 p-3 text-sm leading-relaxed text-zinc-700">
        {mentor.bio}
      </p>

      <div className="mt-5 border-t border-zinc-100 pt-4">
        <Link
          href={`/mentor/${id}`}
          className="block w-full rounded-lg bg-sky-500 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-600"
        >
          전체 프로필 보기
        </Link>
        <p className="mt-3 text-center text-xs text-zinc-400">
          인터셉트 라우트 (..)mentor — 네이티브 &lt;dialog&gt; 모달
        </p>
      </div>
    </dialog>
  );
};

export default MentorModal;
