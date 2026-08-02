const NotificationsPage = async () => {
  // 알림 슬롯 — 1초 후 등장. 다른 슬롯(Q&A)과 무관하게 독립 로딩.
  await new Promise((res) => setTimeout(res, 1000));

  const notifications = [
    { id: "n1", title: "새 댓글", body: "민지님이 당신의 게시글에 답글을 남겼습니다.", time: "방금" },
    { id: "n2", title: "시스템 점검", body: "다음 주 일요일 새벽 2시 정기 점검이 예정되어 있어요.", time: "10분 전" },
    { id: "n3", title: "업데이트", body: "대시보드에 새 위젯이 추가되었습니다.", time: "1시간 전" },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-base">
          🔔
        </span>
        <h2 className="font-semibold text-zinc-900">알림</h2>
        <span className="ml-auto rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
          1s
        </span>
      </div>
      <ul className="mt-4 space-y-3">
        {notifications.map((n) => (
          <li key={n.id} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-800">{n.title}</p>
              <span className="text-[11px] text-zinc-400">{n.time}</span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-500">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;
