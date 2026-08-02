"use client";

import { useRouter } from "next/navigation";

// 인터셉트 모달의 닫기 — 클라이언트 내비게이션 history.back() 으로 복귀.
// 인터셉트 라우트는 진입 시 히스토리에 남으므로, form method="dialog" 대신
// router.back() 이 자연스럽게 피드(이전 화면)로 돌아간다.
const MentorModalClose = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="닫기"
      onClick={() => router.back()}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-800"
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
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
};

export default MentorModalClose;
