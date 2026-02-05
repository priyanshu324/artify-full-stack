"use client";

import Image from "next/image";
import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import {
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
} from "@/src/store/redux/zCart/zCartSlice";

export default function CartPage() {
    const dispatch = useZDispatch();
    const items = useZSelector((s) => s.zCart.items);

    const total = items.reduce(
        (acc, i) => acc + i.price * i.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <div className="py-20 text-center text-gray-600">
                Your cart is empty 🛒
            </div>
        );
  }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-3xl font-semibold mb-8">
              Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Items */}
              <div className="lg:col-span-2 space-y-6">
                  {items.map((item) => (
                      <div
                          key={item.id}
                  className="flex justify-between border p-4 rounded"
              >
                  <div className="flex gap-4">
                      <Image
                          src={item.img}
                          alt={item.name}
                          width={100}
                          height={100}
                      />
                      <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-500">
                              Rs. {item.price.toLocaleString("en-IN")}
                          </p>

                          <div className="flex gap-2 mt-2">
                              <button onClick={() => dispatch(decreaseQty(item.id))}>
                                  −
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => dispatch(increaseQty(item.id))}>
                                  +
                              </button>
                          </div>
                      </div>
                  </div>

                  <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-600 underline"
                  >
                      Remove
                  </button>
              </div>
          ))}
              </div>

              {/* Summary */}
              <div className="border p-6 rounded bg-gray-50">
                  <h2 className="text-xl font-semibold mb-4">
                      Order Summary
                  </h2>

                  <p className="mb-4">
                      Total: <strong>Rs. {total.toLocaleString("en-IN")}</strong>
                  </p>

                  <button className="w-full bg-[#B88E2F] text-white py-3 rounded">
                      Proceed to Checkout
                  </button>

                  <button
                      onClick={() => dispatch(clearCart())}
                      className="w-full mt-4 text-sm underline text-gray-600"
                  >
                      Clear Cart
                  </button>
              </div>
          </div>
      </section>
  );
}
