// NOTE(cacheComponents): `export const dynamic` 는 `nextConfig.cacheComponents` 와
// 호환되지 않아 제거됨. Performance 페이지 는 fetch 미설정(기본 캐시)으로 동작한다.

const PerformancePage = async () => {
  // NOTE(cacheComponents): self 절대URL(`http://localhost:3000/api/metrics`) fetch 가
  // 캐시 컴포넌트 프리렌더에서 uncached/실패 를 유발해 주석 처리함.
  // const metrics = await fetch("http://localhost:3000/api/metrics");
  // const metricsData = await metrics.json();
  const metricsData = {
    message: "Hello, world!",
    generatedAt: "1970-01-01T00:00:00.000Z",
  };

  return (
    <div>
      PerformancePage {metricsData.message}
      <br />
      Generated at: {metricsData.generatedAt}
    </div>
  );
};

export default PerformancePage;
