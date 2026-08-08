import Link from "next/link";
import SuggestionForm from "../SuggestionForm";

// write 페이지 콘텐츠. 부모(page)는 params를 await 하지 않고 Promise 그대로 넘겨,
// <Suspense> 보호 구간 안에서 해제하도록 한다 ("방호벽" 패턴, board/[id]/page 참고).
const WriteContent = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id: boardId } = await params;

  return (
    <>
      <div className="mb-8">
        <Link
          href={`/board/${boardId}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
        >
          ← 게시판 {boardId}로 돌아가기
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          새 제안 작성
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          게시판에 반영하고 싶은 아이디어를 제안해 주세요.
        </p>
      </div>

      <SuggestionForm />
    </>
  );
};

export default WriteContent;
