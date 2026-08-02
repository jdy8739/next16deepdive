"use cache";

import { deleteBoardSuggestion, getBoardSuggestions } from "@/app/actions";

interface Suggestion {
  id: string;
  boardId: string;
  content: string;
  createdAt: string;
}

const SuggestionList = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await new Promise((res) => {
    setTimeout(res, 500);
  });

  // 부모가 넘긴 params(Promise)를 여기서 해제한다.
  const { id } = await params;

  // `/api/board/[id]` 라우트 fetch 대신, 삭제 서버 액션과 동일한 db 인스턴스를 쓰는
  // 서버 액션(getBoardSuggestions)으로 직접 조회한다 — 인스턴스 분리 없이 일관.
  const suggestions: Suggestion[] = await getBoardSuggestions(id);

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
          use cache · 서버 액션 조회
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          게시판 {id} 제안
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {suggestions.length}건 · 삭제 버튼은 JS 없이 HTML Form으로 동작합니다.
        </p>
      </div>

      {suggestions.length === 0 ? (
        <p className="rounded-xl border border-zinc-200 bg-white px-4 py-6 text-center text-sm text-zinc-400">
          이 게시판에는 남은 제안이 없습니다.
        </p>
      ) : (
        <ul className="space-y-3">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="min-w-0">
                <p className="text-zinc-900">{suggestion.content}</p>
                <p className="mt-1.5 text-xs text-zinc-400">
                  {new Date(suggestion.createdAt).toLocaleString()}
                </p>
              </div>
              <form
                action={deleteBoardSuggestion.bind(null, id, suggestion.id)}
                className="shrink-0"
              >
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
                >
                  삭제
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionList;
