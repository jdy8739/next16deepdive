const PortalLoading = () => {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-zinc-200" />
        <div className="flex-1">
          <div className="h-4 w-40 rounded bg-zinc-200" />
          <div className="mt-2 h-3 w-56 rounded bg-zinc-100" />
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-zinc-100" />
        ))}
      </div>
    </div>
  );
};

export default PortalLoading;
