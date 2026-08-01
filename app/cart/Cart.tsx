"use client";

import { startTransition, useOptimistic } from "react";
import { decreaseItemCount, increaseItemCount } from "./actions";

const Cart = ({
  productId,
  initialCount,
  maxStock,
}: {
  productId: string;
  initialCount: number;
  maxStock: number;
}) => {
  const [optimisticItemCount, addOptimistic] = useOptimistic(
    initialCount,
    (_, value: number) => value,
  );

  const handleIncrease = () => {
    startTransition(() => {
      // 옵티미스틱 업데이트가 서버 요청보다 먼저 즉시 반영된다.
      addOptimistic(optimisticItemCount + 1);
      void increaseItemCount(productId);
    });
  };

  const handleDecrease = () => {
    startTransition(() => {
      addOptimistic(optimisticItemCount - 1);
      void decreaseItemCount(productId);
    });
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrease}
          className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer bg-zinc-200 text-zinc-700 hover:bg-zinc-300"
        >
          −
        </button>
        <span className="text-sm text-zinc-700">
          {optimisticItemCount} / {maxStock}
        </span>
        <button
          type="button"
          onClick={handleIncrease}
          className="rounded-lg px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Cart;
