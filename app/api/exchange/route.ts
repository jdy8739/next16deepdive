import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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
