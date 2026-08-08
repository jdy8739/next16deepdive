"use client";

import SuggestionButton from "./SuggestionButton";
import { addSuggestion } from "@/app/actions";
import { useParams } from "next/navigation";
import { useActionState } from "react";

const INITIAL_STATE = {
  ok: false,
  isValidId: true,
  attemptCount: 0,
};

const SuggestionForm = () => {
  const { id: boardId } = useParams<{ id: string }>();

  const [state, action] = useActionState(addSuggestion, INITIAL_STATE);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <form action={action} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="content"
            className="mb-1.5 block text-sm font-semibold text-zinc-900"
          >
            제안 내용
          </label>
          <input
            id="content"
            name="content"
            required
            minLength={5}
            placeholder="제안하고 싶은 내용을 5자 이상 입력해 주세요."
            className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-200"
          />
        </div>

        <input type="hidden" name="boardId" value={boardId} />
        <input type="hidden" name="attemptCount" value={state.attemptCount} />

        {state.isValidId === false && (
          <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
            유효하지 않은 게시판입니다.
          </p>
        )}

        {state.ok === false && state.message && (
          <p className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-700">
            {state.message}
          </p>
        )}

        <SuggestionButton>제안 등록하기</SuggestionButton>
      </form>
    </section>
  );
};

export default SuggestionForm;
