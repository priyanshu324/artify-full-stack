"use client";

import Link from "next/link";
import { orders } from "@/src/data/orders";
import { Order } from "@/src/types/order";
import { useCartStore } from "@/src/store/cartStore";
import Toast from "@/src/components/ui/Toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrdersPage() {
  const myOrders: Order[] = orders;

  const addToCart = useCartStore((s) => s.addToCart);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1500);
  };

  // 🔥 REORDER LOGIC
  const handleReorder = (order: Order) => {
    if (!order || !order.items.length) return;

    order.items.forEach((it) => {
      addToCart({
        id: it.id,
        name: it.name,
        price: it.price,
        img: it.img,
        slug: it.slug,
        quantity: 1,
      });
    });

    showToast("Items added to cart again");

    // Optional redirect to cart
    setTimeout(() => router.push("/cart"), 1200);
  };

    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        <div className="space-y-4">
          {myOrders.map((o) => (
            <div
              key={o.orderId}
              className="bg-white p-4 rounded shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <div className="font-medium">Order #{o.orderId}</div>
                <div className="text-sm text-gray-500">
                  Placed on {o.placedAt}
                </div>
                <div className="mt-1 text-sm">
                  <strong>Status:</strong> {o.status}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {o.items.length} items • Total Rp{" "}
                  {o.totalAmount.toLocaleString("id-ID")}
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/orders/${o.orderId}`}
                  className="px-4 py-2 border rounded"
                >
                  View Order
                </Link>

                {/* 🔥 REORDER BUTTON */}
                <button
                  onClick={() => handleReorder(o)}
                  className="px-4 py-2 bg-[#B88E2F] text-white rounded hover:bg-[#a87826] transition cursor-pointer"
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>

        {toast && <Toast message={toast} />}
      </section>
    );
}
