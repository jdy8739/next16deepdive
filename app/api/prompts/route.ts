import { NextResponse } from "next/server";
import db from "@/lib/db";

interface Prompt {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const GET = async () => {
  return NextResponse.json(db.prompts, { status: 200 });
};

const POST = async (request: Request) => {
  const { content } = await request.json();

  if (!content) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 },
    );
  }

  const lastPrompt = db.prompts[db.prompts.length - 1];

  const newPrompt: Prompt = {
    id: String((lastPrompt ? Number(lastPrompt.id) : 0) + 1),
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  db.prompts.push(newPrompt);

  return NextResponse.json(newPrompt, { status: 201 });
};

const DELETE = async () => {
  return NextResponse.json(undefined, { status: 200 });
};

export { GET, POST, DELETE };
