"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

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
