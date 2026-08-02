import db from "@/lib/db";

const DashboardPage = () => {
  const promptCount = db.prompts.length;
  const applicationCount = db.mentoringApplications.length;
  const cartCount = db.cartItems.length;
  const totalCartCount = db.cartItems.reduce(
    (sum, item) => sum + item.count,
    0,
  );

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Overview of the application data.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="text-sm font-medium text-zinc-500">Prompts</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{promptCount}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="text-sm font-medium text-zinc-500">Mentoring Applications</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">
            {applicationCount}
          </p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <p className="text-sm font-medium text-zinc-500">Cart Items</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{cartCount}</p>
          <p className="mt-1 text-sm text-zinc-400">
            {totalCartCount} total units
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold text-zinc-900">
          Current Cart
        </h2>
        {db.cartItems.length === 0 ? (
          <p className="text-sm text-zinc-400">No items in the cart.</p>
        ) : (
          <ul className="space-y-2">
            {db.cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 shadow-sm"
              >
                <div className="min-w-0">
                  <p className="font-medium text-zinc-900">{item.product}</p>
                  <p className="text-sm text-zinc-500">{item.descriptions}</p>
                </div>
                <span className="shrink-0 text-sm text-zinc-600">
                  {item.count} / {item.maxStock}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default DashboardPage;
