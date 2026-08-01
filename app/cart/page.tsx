import db from "@/lib/db";
import Cart from "./Cart";

const CartPage = () => {
  const cartList = db.cartItems;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cart
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {cartList.length} item{cartList.length === 1 ? "" : "s"} in your cart
        </p>
      </header>

      {cartList.length === 0 ? (
        <p className="text-center text-sm text-zinc-400">
          Your cart is empty.
        </p>
      ) : (
        <ul className="space-y-3">
          {cartList.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-zinc-900">{item.product}</p>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    {item.descriptions}
                  </p>
                </div>
              </div>
              <Cart
                productId={item.id}
                initialCount={item.count}
                maxStock={item.maxStock}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default CartPage;
