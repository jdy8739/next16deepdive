import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

const RegisterButton = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 ${
        pending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      {pending ? "registering..." : children}
    </button>
  );
};

export default RegisterButton;
