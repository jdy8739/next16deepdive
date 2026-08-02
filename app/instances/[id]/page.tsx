import { Suspense } from "react";

const InstanceDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // NOTE(cacheComponents): `params`(동적 경로)와 self-fetch 는 uncached 로 취급되어
  // Suspense 안에서만 접근할 수 있다. self-fetch 는 아래에 주석 처리함.
  const { id } = await params;

  // const instanceResponse = await fetch(
  //   `http://localhost:3000/api/instances/${id}`,
  //   { cache: "no-store" },
  // );
  // const instanceData = await instanceResponse.json();
  const instanceData = { name: id, description: "cached placeholder" };

  return (
    <div>
      <h1>{instanceData.name}</h1>
      <p>{instanceData.description}</p>
    </div>
  );
};

const InstancePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  // `params` 접근은 uncached runtime data 이므로 Suspense 안에서만 수행한다.
  return (
    <Suspense
      fallback={
        <div className="h-20 animate-pulse rounded-lg bg-zinc-100" />
      }
    >
      <InstanceDetail params={params} />
    </Suspense>
  );
};

export default InstancePage;
