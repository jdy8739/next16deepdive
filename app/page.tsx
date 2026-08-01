import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 gap-3 items-center justify-center">
      <Link href="/instances/1">Instance 1</Link>
      <Link href="/instances/2">Instance 2</Link>
      <Link href="/instances/3">Instance 3</Link>
    </main>
  );
}
