"use cache";

import { cacheLife, cacheTag } from "next/cache";
import {
  deleteCourseReview,
  deleteCourseReviewImmediate,
  getCourseReviews,
} from "@/app/actions";

interface CourseReview {
  id: string;
  courseId: string;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
}

const ReviewsList = async ({ params }: { params: Promise<{ id: string }> }) => {
  cacheLife("max");

  // 부모가 넘긴 params(Promise)를 여기서 해제한다.
  const { id } = await params;
  cacheTag(`reviews-${id}`);

  // `/api/course/[id]` 라우트 fetch 대신, 삭제 서버 액션과 동일한 db 인스턴스를 쓰는
  // 서버 액션(getCourseReviews)으로 직접 조회한다 — 인스턴스 분리 없이 일관.
  const reviews: CourseReview[] = await getCourseReviews(id);

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          use cache · 최초 0.5초 결빙
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900">
          수강평 {id}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {reviews.length}건 · 최초 1회 0.5초 DB 조회 후, 새로고침 수백 번도
          0초(캐시 히트).
        </p>
      </div>

      {reviews.length === 0 ? (
        <p className="rounded-xl border border-zinc-200 bg-white px-4 py-6 text-center text-sm text-zinc-400">
          아직 수강평이 없습니다.
        </p>
      ) : (
        <ul className="space-y-3">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-zinc-900">
                        {review.author}
                      </p>
                      {review.id === "r2" ? (
                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-600">
                          악성 리뷰
                        </span>
                      ) : null}
                    </div>
                    <span className="text-sm text-amber-500">
                      {"★".repeat(review.rating).padEnd(5, "☆")}
                    </span>
                  </div>
                  <p className="mt-1 text-zinc-700">{review.content}</p>
                  <p className="mt-2 text-xs text-zinc-400">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <form
                    action={deleteCourseReview.bind(null, id, review.id)}
                  >
                    <button
                      type="submit"
                      className="cursor-pointer rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
                    >
                      삭제(SWR)
                    </button>
                  </form>
                  <form
                    action={deleteCourseReviewImmediate.bind(
                      null,
                      id,
                      review.id,
                    )}
                  >
                    <button
                      type="submit"
                      className="cursor-pointer rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-rose-600"
                    >
                      ⚡ 즉시 삭제
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewsList;
