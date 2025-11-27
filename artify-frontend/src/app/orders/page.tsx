// src/app/orders/page.tsx

import OrderList from "@/src/components/orders/OrderList";

export default function OrdersPage() {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-semibold mb-8">My Orders</h1>
          <OrderList />
      </section>
  );
}
