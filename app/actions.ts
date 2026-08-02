"use server";

import db from "@/src/lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const issueCookie = async () => {
  const cookieStore = await cookies();
  const focusmode =
    cookieStore.get("focusmode")?.value === "focused" ? "blured" : "focused";

  cookieStore.set("focusmode", focusmode, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  revalidatePath("/", "layout");
};

export const requestLogin = async (formData: FormData) => {
  const authCode = formData.get("authCode");

  let isSuccess;

  try {
    const targetAuthCode = db.auth.find((auth) => auth.authCode === authCode);

    if (!targetAuthCode) {
      throw new Error();
    }

    isSuccess = true;
  } catch {
    isSuccess = false;
  }

  if (isSuccess) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login?error=invalid_code");
  }
};
