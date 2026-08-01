"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export const increaseItemCount = async (productId: string): Promise<void> => {
  const targetItem = db.cartItems.find((item) => item.id === productId);

  if (!targetItem) {
    return;
  }

  const count = targetItem.count + 1;

  if (count > targetItem.maxStock) {
    return;
  }

  targetItem.count = count;

  revalidatePath("/cart");
};

export const decreaseItemCount = async (productId: string): Promise<void> => {
  const targetItem = db.cartItems.find((item) => item.id === productId);

  if (!targetItem) {
    return;
  }

  const count = targetItem.count - 1;

  if (count < 1) {
    return;
  }

  targetItem.count = count;

  revalidatePath("/cart");
};
