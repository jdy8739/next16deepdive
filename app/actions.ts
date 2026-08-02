"use server";

import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const issueCookie = async () => {
  const cookieStore = await cookies();
  const focusmode =
    cookieStore.get("focusmode")?.value === "focused" ? "blured" : "focused";

  cookieStore.set("focusmode", focusmode, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  revalidatePath("/", "layout");
};

export const requestLogin = async (formData: FormData) => {
  const authCode = formData.get("authCode");

  let isSuccess;

  try {
    const targetAuthCode = db.auth.find((auth) => auth.authCode === authCode);

    if (!targetAuthCode) {
      throw new Error();
    }

    isSuccess = true;
  } catch {
    isSuccess = false;
  }

  if (isSuccess) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login?error=invalid_code");
  }
};

// 모의 DB 기반 게시판 제안 조회 서버 액션.
// `/api/board/[id]` 라우트 fetch 대신, 삭제 서버 액션과 동일한 db 인스턴스에서
// 직접 읽어 반환한다 — 인스턴스 분리 없이 조회/삭제가 같은 저장소를 바라본다.
export const getBoardSuggestions = async (boardId: string) => {
  return db.boardSuggestions.filter(
    (suggestion) => suggestion.boardId === boardId,
  );
};

// 모의 DB 기반 게시판 제안 삭제 서버 액션.
// 삭제 직후 revalidatePath(`/board/${boardId}`) 로 해당 게시판 캐시를 정밀 타격한다.
// `.bind(null, boardId, suggestionId)` 로 HTML Form action 에 연결한다.
export const deleteBoardSuggestion = async (
  boardId: string,
  suggestionId: string,
) => {
  const index = db.boardSuggestions.findIndex(
    (suggestion) =>
      suggestion.id === suggestionId && suggestion.boardId === boardId,
  );

  if (index !== -1) {
    db.boardSuggestions.splice(index, 1);
  }

  revalidatePath(`/board/${boardId}`);
};
