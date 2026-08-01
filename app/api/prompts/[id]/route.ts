import { NextResponse } from "next/server";
import db from "@/lib/db";

const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const index = db.prompts.findIndex((prompt) => prompt.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
  }

  const [deletedPrompt] = db.prompts.splice(index, 1);

  return NextResponse.json(deletedPrompt, { status: 200 });
};

const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const index = db.prompts.findIndex((prompt) => prompt.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
  }

  const { content } = await request.json();
  const patched = { ...db.prompts[index], content };
  db.prompts[index] = patched;

  return NextResponse.json(patched, { status: 200 });
};

export { DELETE, PATCH };
