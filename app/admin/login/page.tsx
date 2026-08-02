import { requestLogin } from "@/app/actions";

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) => {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 items-center justify-center px-6">
      <form
        action={requestLogin}
        className="w-full space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm"
      >
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            Admin Login
          </h1>
          <p className="text-sm text-zinc-500">
            Enter your admin auth code to continue.
          </p>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="authCode"
            className="block text-sm font-medium text-zinc-700"
          >
            Auth Code
          </label>
          <input
            id="authCode"
            name="authCode"
            required
            placeholder="Enter auth code..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error === "invalid_code" ? (
          <p
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            잘못된 인증 코드입니다. 다시 시도해 주세요.
          </p>
        ) : null}

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Log in
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
