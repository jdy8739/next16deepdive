import { NextResponse } from "next/server";

const INSTANCES = [
  { id: 1, name: "Instance 1", description: "Instance 1 description" },
  { id: 2, name: "Instance 2", description: "Instance 2 description" },
  { id: 3, name: "Instance 3", description: "Instance 3 description" },
];

const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;

  const instance = INSTANCES.find((instance) => instance.id === parseInt(id));

  if (!instance) {
    return NextResponse.json({ error: "Instance not found" }, { status: 404 });
  }

  return NextResponse.json(instance, { status: 200 });
};

export { GET };
