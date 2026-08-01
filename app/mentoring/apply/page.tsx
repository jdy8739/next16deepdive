"use client";

import { useActionState } from "react";
import { applyMentoring } from "./actions";

const ApplyPage = () => {
  const [state, action, isPending] = useActionState(applyMentoring, {
    ok: false,
  });

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Apply for Mentoring
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Submit a mentoring application
        </p>
      </header>

      <form
        action={action}
        className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Enter your name..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-zinc-700"
          >
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            required
            placeholder="Enter the mentoring subject..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 ${
            isPending ? "cursor-not-allowed opacity-60" : "cursor-pointer"
          }`}
        >
          {isPending ? "Applying..." : "Apply"}
        </button>
      </form>

      {state && state.message ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      ) : null}
    </main>
  );
};

export default ApplyPage;
