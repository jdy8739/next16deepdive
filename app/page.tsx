import { Suspense } from "react";
import Link from "next/link";
import FocusModeButton from "./components/FocusModeButton";
import { cookies } from "next/headers";

// NOTE(cacheComponents): `cookies()` 는 uncached runtime data 로 취급되어
// Suspense 안에서만 접근해야 한다.
const HomeContent = async () => {
  const cookieStore = await cookies();
  const focusmode =
    cookieStore.get("focusmode")?.value === "focused" ? "focused" : "blured";

  // 쿠키(focus)에 따라 폰트 사이즈와 여백(Tailwind)을 유연하게 조정한다.
  const isFocused = focusmode === "focused";
  const containerClasses = isFocused
    ? "flex flex-1 flex-col items-center justify-center gap-8 p-12 text-xl"
    : "flex flex-1 flex-col items-center justify-center gap-3 p-4 text-base";
  const linkClasses = isFocused
    ? "rounded-lg bg-zinc-100 px-6 py-3 text-2xl font-medium text-zinc-800 transition-colors hover:bg-zinc-200"
    : "rounded-lg bg-zinc-100 px-4 py-2 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-200";

  return (
    <main className={containerClasses}>
      <header>
        <FocusModeButton />
      </header>
      <Link href="/instances/1" className={linkClasses}>
        Instance 1
      </Link>
      <Link href="/instances/2" className={linkClasses}>
        Instance 2
      </Link>
      <Link href="/instances/3" className={linkClasses}>
        Instance 3
      </Link>
    </main>
  );
};

export default function Home() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center">
          <p className="text-sm text-zinc-400">Loading...</p>
        </main>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
