"use server";

import db from "@/lib/db";
import { revalidatePath, revalidateTag, updateTag } from "next/cache";
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

// 모의 DB 기반 수강평 조회 서버 액션.
// `/api/course/[id]` 라우트 fetch 대신, 삭제 서버 액션과 동일한 db 인스턴스에서
// 직접 읽어 반환한다 — 인스턴스 분리 없이 조회/삭제가 같은 저장소를 바라본다.
export const getCourseReviews = async (courseId: string) => {
  return db.courseReviews.filter((review) => review.courseId === courseId);
};

// 모의 DB 기반 수강평 삭제 서버 액션.
// 삭제 직후 revalidatePath(`/course/${courseId}`) 로 해당 코스 캐시를 정밀 타격한다.
// `.bind(null, courseId, reviewId)` 로 HTML Form action 에 연결한다.
export const deleteCourseReview = async (
  courseId: string,
  reviewId: string,
) => {
  const index = db.courseReviews.findIndex(
    (review) => review.id === reviewId && review.courseId === courseId,
  );

  if (index !== -1) {
    db.courseReviews.splice(index, 1);
  }

  revalidateTag(`reviews-${courseId}`, "max");
};

// [무기 2] 궁극의 즉시 타격 — updateTag 기반 동기적 캐시 붕괴.
// deleteCourseReview(revalidateTag, SWR·부드럽게) 와 달리, updateTag 는 Server Action
// 안에서 호출되면 해당 태그 캐시를 즉시 만료시키고, 다음 요청은 stale 없이 새 데이터를
// 받아 곧바로 화면이 강제 리렌더된다 ("악성 리뷰 즉시 소멸").
// `.bind(null, courseId, reviewId)` 로 HTML Form action 에 연결한다.
export const deleteCourseReviewImmediate = async (
  courseId: string,
  reviewId: string,
) => {
  const index = db.courseReviews.findIndex(
    (review) => review.id === reviewId && review.courseId === courseId,
  );

  if (index !== -1) {
    db.courseReviews.splice(index, 1);
  }

  updateTag(`reviews-${courseId}`);
};

export interface IssueState {
  ok: boolean;
  message?: string;
  attemptCount: number;
  isValidId?: boolean;
}

export const addSuggestion = async (
  state: IssueState,
  formData: FormData,
): Promise<IssueState> => {
  const boardId = formData.get("boardId");

  if (Number.isNaN(Number(boardId))) {
    return {
      ok: false,
      message: "유효하지 않은 게시판입니다",
      attemptCount: state.attemptCount + 1,
      isValidId: false,
    };
  }

  const content = formData.get("content") as string;

  if (content.length < 4) {
    return {
      ok: false,
      message: '5자 이상 입력하세요" 에러 렌더링',
      attemptCount: state.attemptCount + 1,
      isValidId: true,
    };
  }

  // put the data db well
  db.boardSuggestions.push({
    id: `s${db.boardSuggestions.length + 1}`,
    boardId: String(boardId),
    content,
    createdAt: new Date().toISOString(),
    likeCount: 0,
  });

  updateTag(`board-${boardId}-suggestions`);

  redirect(`/board/${boardId}`);
};

// 모의 DB 기반 게시판 제안 좋아요(+1) 서버 액션.
// 30% 확률로 서버 장애를 시뮬레이션한다 — 실패 시 throw 하여 클라이언트의
// useOptimistic 이 자동 롤백되도록 트리거한다. 성공 시 likeCount+1 후 updateTag 로
// 해당 게시판 캐시를 만료시킨다.
export const likeSuggestion = async (boardId: string, suggestionId: string) => {
  if (Math.random() < 0.3) {
    throw new Error("서버 장애: 좋아요 처리 실패");
  }

  const target = db.boardSuggestions.find(
    (suggestion) =>
      suggestion.id === suggestionId && suggestion.boardId === boardId,
  );

  if (target) {
    target.likeCount += 1;
  }

  updateTag(`board-${boardId}-suggestions`);
};

// 모의 DB 기반 게시판 제안 좋아요 취소 서버 액션.
// likeSuggestion 과 동일하게 30% 확률로 서버 장애를 시뮬레이션한다(throw 로 롤백 유도).
// toggled 상태(이미 좋아요 누른 경우)에서 dislike 쪽으로 돌아가면 호출되어,
// likeCount 를 -1 하여 좋아요를 취소한다. 성공 시 해당 게시판 캐시를 만료시킨다.
export const dislikeSuggestion = async (
  boardId: string,
  suggestionId: string,
) => {
  if (Math.random() < 0.3) {
    throw new Error("서버 장애: 좋아요 취소 실패");
  }

  const target = db.boardSuggestions.find(
    (suggestion) =>
      suggestion.id === suggestionId && suggestion.boardId === boardId,
  );

  if (target && target.likeCount > 0) {
    target.likeCount -= 1;
  }

  updateTag(`board-${boardId}-suggestions`);
};

export async function toggleVipModeAction() {
  const cookieStore = await cookies();
  const isVip = cookieStore.get("vip_mode")?.value === "true";

  await new Promise((res) => setTimeout(res, 1000)); // 논블로킹 확인용 지연

  cookieStore.set("vip_mode", isVip ? "false" : "true", {
    httpOnly: true,
    path: "/",
  });
}
