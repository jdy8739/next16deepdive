"use client";

import { useTransition } from "react";
import { issueCookie } from "../actions";

const FocusModeButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleToggleMode = () => {
    startTransition(async () => {
      await issueCookie();
    });
  };

  return (
    <button disabled={isPending} onClick={handleToggleMode}>
      toggle mode
    </button>
  );
};

export default FocusModeButton;
