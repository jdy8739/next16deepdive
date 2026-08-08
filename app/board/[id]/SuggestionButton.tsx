"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

const SuggestionButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden
          />
          제출 중...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default SuggestionButton;
