// 알림 슬롯 전용 로딩 스켈레톤 — 빙글빙글 스피너.
const NotificationsLoading = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-base">
          🔔
        </span>
        <div className="h-4 w-12 rounded bg-zinc-200" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-2 py-8">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
        <span className="text-sm text-zinc-400">알림 불러오는 중…</span>
      </div>
    </div>
  );
};

export default NotificationsLoading;
