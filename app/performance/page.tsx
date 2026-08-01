export const dynamic = "force-dynamic";

const PerformancePage = async () => {
  const metrics = await fetch("http://localhost:3000/api/metrics");

  const metricsData = await metrics.json();

  return (
    <div>
      PerformancePage {metricsData.message}
      <br />
      Generated at: {metricsData.generatedAt}
    </div>
  );
};

export default PerformancePage;
