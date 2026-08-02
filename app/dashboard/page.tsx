import { Suspense } from "react";

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const ReviewsList = async () => {
  // NOTE(cacheComponents): self 절대URL(`http://localhost:3000/api/webhooks/reviews`) fetch 가
  // 캐시 컴포넌트 프리렌더에서 uncached/실패 를 유발해 주석 처리함.
  // const reviewsResponse = await fetch(
  //   "http://localhost:3000/api/webhooks/reviews",
  // );
  // const reviews = (await reviewsResponse.json()) as Review[];
  const reviews: Review[] = [
    {
      id: "1",
      content: "cached review",
      rating: 5,
      createdAt: "1970-01-01T00:00:00.000Z",
      updatedAt: "1970-01-01T00:00:00.000Z",
    },
  ];

  return (
    <div>
      DashboardPages{" "}
      {reviews.map((review) => (
        <div key={review.id}>{review.content}</div>
      ))}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-20 animate-pulse rounded-lg bg-zinc-100" />
      }
    >
      <ReviewsList />
    </Suspense>
  );
};

export default DashboardPage;
