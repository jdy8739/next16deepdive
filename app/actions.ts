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
