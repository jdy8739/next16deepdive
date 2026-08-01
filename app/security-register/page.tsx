"use client";

import { registerDevice } from "./actions";
import RegisterButton from "./RegisterButton";

const SecurityRegister = () => {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Security Register
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Register a new device to enable security
        </p>
      </header>

      <form
        action={registerDevice as unknown as string}
        className="flex gap-2 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm"
      >
        <input
          name="deviceName"
          aria-label="Device name"
          placeholder="Enter device name..."
          className="flex-1 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500"
        />
        <RegisterButton>Register</RegisterButton>
      </form>
    </main>
  );
};

export default SecurityRegister;
