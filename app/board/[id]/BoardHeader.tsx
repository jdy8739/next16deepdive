import Link from "next/link";

const BoardHeader = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // 부모가 넘긴 params(Promise)를 여기서 해제한다 (Suspense 보호 구간 내부).
  const { id: boardId } = await params;

  return (
    <div className="mb-6 flex items-center justify-between">
      <Link
        href={`/board/${boardId}/write`}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700"
      >
        새 제안 작성
      </Link>
    </div>
  );
};

export default BoardHeader;
