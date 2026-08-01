import { NextResponse } from "next/server";

export const revalidate = 60;

const GET = async () => {
  return NextResponse.json({
    message: "Hello, world!",
    generatedAt: new Date().toISOString(),
  });
};

export { GET };
