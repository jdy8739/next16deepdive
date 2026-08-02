import { NextResponse } from "next/server";

// NOTE(cacheComponents): `export const revalidate` 는 `nextConfig.cacheComponents` 와
// 호환되지 않아 제거됨. metric 엔드포인트는 매 요청 동적으로 응답한다.

const GET = async () => {
  return NextResponse.json({
    message: "Hello, world!",
    generatedAt: new Date().toISOString(),
  });
};

export { GET };
