const InstancePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const instanceResponse = await fetch(
    `http://localhost:3000/api/instances/${id}`,
    {
      cache: "no-store",
    },
  );

  const instanceData = await instanceResponse.json();

  return (
    <div>
      <h1>{instanceData.name}</h1>
      <p>{instanceData.description}</p>
    </div>
  );
};

export default InstancePage;
