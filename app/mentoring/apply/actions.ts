"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface ApplyState {
  ok: boolean;
  message?: string;
}

export const applyMentoring = async (
  prevState: ApplyState,
  formData: FormData,
): Promise<ApplyState> => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1500);
  });

  const name = String(formData.get("name") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();

  if (!name || !subject) {
    return {
      ok: false,
      message: "Name and subject are required.",
    };
  }

  const last = db.mentoringApplications[db.mentoringApplications.length - 1];

  db.mentoringApplications.push({
    id: String((last ? Number(last.id) : 0) + 1),
    name,
    subject,
    createdAt: new Date().toISOString(),
  });

  revalidatePath("/mentoring");
  redirect("/mentoring");
};
