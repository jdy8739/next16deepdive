import { NextResponse } from "next/server";
import db from "@/lib/db";

// NOTE(cacheComponents): `export const dynamic` 는 `nextConfig.cacheComponents` 와
// 호환되지 않아 제거됨. 인사이트 API 는 매 요청 동적으로 응답한다.

const GET = async () => {
  const quotes = db.insightQuotes;

  const randomIndex = Math.floor(Math.random() * quotes.length);

  return NextResponse.json(
    {
      quote: quotes[randomIndex],
      servedAt: new Date().toISOString(),
    },
    { status: 200 },
  );
};

export { GET };
