"use client";

import { dislikeSuggestion, likeSuggestion } from "@/app/actions";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useOptimistic } from "react";

const LikeButton = ({
  likeCount,
  suggestionId,
}: {
  likeCount: number;
  suggestionId: string;
}) => {
  const { id: boardId } = useParams<{ id: string }>();

  // 커밋(진실) 기준 상태. 사용자가 좋아요를 눌렀는지 여부와 그때의 카운트.
  const [committed, setCommitted] = useState({
    liked: false,
    count: likeCount,
  });

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // 옵티미스틱: 커밋을 베이스로 두고 addOptimistic 으로 다음 표시값을 즉시 반영.
  // 액션이 settle 되면 커밋 상태로 돌아간다(성공 시 setCommitted 로 정착,
  // 실패 시 throw + 커밋 불변 → 자동 롤백).
  const [optimistic, addOptimistic] = useOptimistic(
    committed,
    (_, next: { liked: boolean; count: number }) => next,
  );

  const handleToggle = () => {
    startTransition(async () => {
      const next = {
        liked: !optimistic.liked,
        count: optimistic.count + (optimistic.liked ? -1 : 1),
      };

      addOptimistic(next);

      try {
        if (next.liked) {
          await likeSuggestion(boardId, suggestionId);
        } else {
          await dislikeSuggestion(boardId, suggestionId);
        }
        setCommitted(next);
        setError(null);
      } catch {
        // 서버가 throw 하면 커밋을 건드리지 않는다 → useOptimistic 이
        // 이전 커밋으로 자동 롤백. 시각적으로는 에러 안내만 띄운다.
        setError("서버 통신 실패: 원래 상태로 복구되었습니다.");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={optimistic.liked}
        disabled={pending}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
          optimistic.liked
            ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
            : "border-zinc-200 bg-white text-zinc-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        }`}
      >
        <span className="text-rose-500">UP</span>
        <span>{optimistic.count}</span>
      </button>
      {error && (
        <p className="max-w-[10rem] text-right text-[10px] leading-tight text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default LikeButton;
