import { NextResponse } from "next/server";

interface Review {
  id: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const reviews: Review[] = [
  {
    id: "1",
    content: "This is a review",
    rating: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    content: "This is another review",
    rating: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    content: "This is a third review",
    rating: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    content: "This is a fourth review",
    rating: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    content: "This is a fifth review",
    rating: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const GET = async () => {
  return NextResponse.json(reviews, { status: 200 });
};

const POST = async (request: Request) => {
  const review = await request.json();

  if (review.rating < 0 || review.rating > 5) {
    return NextResponse.json(
      { error: "Rating must be between 0 and 5" },
      { status: 400 },
    );
  }

  reviews.push(review);

  if (reviews.length > 5) {
    reviews.shift();
  }

  return NextResponse.json(review, { status: 201 });
};

export { GET, POST };
