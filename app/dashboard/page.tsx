interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const DashboardPage = async () => {
  const reviewsResponse = await fetch(
    `http://localhost:3000/api/webhooks/reviews`,
    {
      cache: "no-store",
    },
  );
  const reviews = (await reviewsResponse.json()) as Review[];

  return (
    <div>
      DashboardPages{" "}
      {reviews.map((review) => (
        <div key={review.id}>{review.content}</div>
      ))}
    </div>
  );
};

export default DashboardPage;
