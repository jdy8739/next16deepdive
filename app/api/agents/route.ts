import { NextResponse } from "next/server";

interface Agent {
  id: number;
  name: string;
  role: string;
}

const AGENTS = [
  { id: 1, name: "CodeReviewBot", role: "코드 리뷰 및 최적화" },
  { id: 2, name: "DocuSummarizer", role: "긴 문서 요약" },
] satisfies Agent[];

const GET = async () => {
  return NextResponse.json(AGENTS);
};

const POST = async (request: Request) => {
  const { name, role } = await request.json();

  if (!name || !role) {
    return NextResponse.json(
      { error: "Name and role are required" },
      { status: 400 },
    );
  }

  const newAgent = { id: AGENTS[AGENTS.length - 1].id + 1, name, role };
  AGENTS.push(newAgent);

  return NextResponse.json(newAgent, { status: 201 });
};

export { GET, POST };
