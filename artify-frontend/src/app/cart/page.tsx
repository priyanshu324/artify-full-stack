"use client";

import { useMemo } from "react";
import { useCartStore } from "@/src/store/cartStore";
import Image from "next/image";
import { useUIStore } from "@/src/store/uiStore";

export default function CartPage() {
    const { isCartOpen, closeCart } = useUIStore();

    const items = useCartStore((s) => s.items);
    const increaseQty = useCartStore((s) => s.increaseQty);
    const decreaseQty = useCartStore((s) => s.decreaseQty);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const clearCart = useCartStore((s) => s.clearCart);

    // robust subtotal: prefer getSubtotal() -> fallback to totalPrice -> fallback compute
    const subtotal = useCartStore((s) => {
        // @ts-ignore - defensive access in case store shape varies
        if (typeof (s as any).getSubtotal === "function") return (s as any).getSubtotal();
        // @ts-ignore - some store variants expose totalPrice as a getter property
        if (typeof (s as any).totalPrice === "number") return (s as any).totalPrice;
        // else return -1 to let local compute run
        return -1;
    });

    // compute fallback if store didn't provide number
    const computedSubtotal = useMemo(() => {
        if (typeof subtotal === "number" && subtotal >= 0) return subtotal;
        return items.reduce((acc, it) => acc + it.price * it.quantity, 0);
    }, [items, subtotal]);

    if (items.length === 0) {
      return (
          <div className="py-20 text-center text-gray-600">
              Your cart is empty 🛒
          </div>
      );
  }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* LEFT SIDE --- Items */}
              <div className="lg:col-span-2 space-y-6">
                  {items.map((item) => (
                      <div
                          key={item.id}
                          className="flex justify-between items-center border rounded-lg p-4"
                      >
                          <div className="flex items-center gap-4">
                      <Image
                          src={item.img}
                          alt={item.name}
                          width={90}
                          height={90}
                          className="rounded-md object-cover"
                      />

                      <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-500">
                              Rs. {item.price.toLocaleString("en-IN")}
                          </p>

                          {/* Quantity Control */}
                          <div className="flex gap-3 mt-2 items-center">
                              <button
                                  onClick={() => decreaseQty(item.id)}
                                  className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100"
                              >
                                  -
                              </button>

                              <span className="px-2">{item.quantity}</span>

                              <button
                                  onClick={() => increaseQty(item.id)}
                                  className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100"
                              >
                                  +
                              </button>
                          </div>
                      </div>
                  </div>

                  <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 underline cursor-pointer"
                  >
                      Remove
                  </button>
              </div>
          ))}
              </div>

              {/* RIGHT SIDE --- Summary */}
              <div className="border rounded-lg p-6 bg-gray-50">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <p className="text-gray-700 mb-4">
                      Total:{" "}
                      <span className="font-bold">
                          Rs. {computedSubtotal.toLocaleString("en-IN")}
                      </span>
                  </p>

                    <button
                        onClick={() => {
                            closeCart();
                            window.location.href = "/checkout";
                        }}
                        className="w-full bg-[#B88E2F] text-white py-3 rounded-md font-semibold">
                      Proceed to Checkout
                  </button>

                  <button
                      onClick={clearCart}
                      className="w-full mt-4 py-2 text-gray-600 underline cursor-pointer"
                  >
                      Clear Cart
                  </button>
              </div>
          </div>
      </section>
  );
}
