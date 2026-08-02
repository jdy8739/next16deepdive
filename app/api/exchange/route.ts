import { NextResponse } from "next/server";

// NOTE(cacheComponents): `export const dynamic` 는 `nextConfig.cacheComponents` 와
// 호환되지 않아 제거됨. 요청마다 랜덤 환율을 동적으로 응답한다.

const USD_KRW_BASE = 1370;

const GET = async () => {
  const usdKrw = USD_KRW_BASE + Math.round(Math.random() * 10 - 5);

  return NextResponse.json(
    {
      base: "USD",
      quote: "KRW",
      rate: usdKrw,
      updatedAt: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
      },
    },
  );
};

export { GET };
