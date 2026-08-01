"use client";

import { issueSecurityClearance, IssueState } from "./actions";
import { useActionState } from "react";

const INITIAL_STATE: IssueState = {
  ok: false,
  isValidId: true,
  attemptCount: 0,
};

const ClearancePage = () => {
  const [state, formAction, isPending] = useActionState(
    issueSecurityClearance,
    INITIAL_STATE,
  );

  const hasFailedThreeTimes =
    !state.ok && state.attemptCount >= 3;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Security Clearance
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Issue a security clearance for an employee
        </p>
      </header>

      <form
        action={formAction}
        className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <div className="space-y-1">
          <label
            htmlFor="employeeId"
            className="block text-sm font-medium text-zinc-700"
          >
            Employee ID
          </label>
          <input
            id="employeeId"
            name="employeeId"
            required
            placeholder="Enter employee ID (at least 4 digits)..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-zinc-700"
          >
            Department
          </label>
          <input
            id="department"
            name="department"
            required
            placeholder="Enter department..."
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
          {isPending ? "Issuing..." : "Issue"}
        </button>
      </form>

      {state && !state.ok && state.attemptCount > 0 ? (
        <div className="mt-4 space-y-2">
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <p className="font-medium">❌ [보안 경고] 사번은 4자리 이상이어야 합니다.</p>
            <p className="mt-1 text-xs text-red-500">
              (현재 인가 시도 횟수: {state.attemptCount}회)
            </p>
          </div>
          {hasFailedThreeTimes ? (
            <div
              role="alert"
              className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
            >
              💡 3번 이상 실패했습니다. 인가 시도가 차단될 수 있습니다.
            </div>
          ) : null}
        </div>
      ) : null}

      {state && state.ok && state.isValidId ? (
        <p
          role="status"
          className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          {state.message}
        </p>
      ) : null}
    </main>
  );
};

export default ClearancePage;
