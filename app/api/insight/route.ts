import { NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

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
