"use client";

import { toggleVipModeAction } from "@/app/actions";
import { useEffect } from "react";
import { useTransition } from "react";

const VipButton = ({ isVip }: { isVip: boolean }) => {
  const [isPending, startTransition] = useTransition();

  // 서버가 알려준 초기 VIP 상태를 <html> 의 dark 클래스로 반영한다.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isVip);
  }, [isVip]);

  const handleToggleVip = () => {
    // 서버 액션이 vip_mode 쿠키를 뒤집으면 <html> 의 dark 클래스를 즉시 토글한다.
    startTransition(async () => {
      await toggleVipModeAction();
      document.documentElement.classList.toggle("dark");
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggleVip}
      disabled={isPending}
      aria-pressed={isVip}
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        isVip
          ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
          : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {isPending ? "VIP 전환 중..." : isVip ? "VIP On" : "VIP Off"}
    </button>
  );
};

export default VipButton;
