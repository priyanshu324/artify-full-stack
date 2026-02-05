// src/components/drawers/CartDrawer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useZUiStore } from "@/src/store/zUiStore";

import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import {
    removeFromCart,
    increaseQty,
    decreaseQty,
} from "@/src/store/redux/zCart/zCartSlice";

export default function CartDrawer() {
    const { isCartOpen, closeCart } = useZUiStore();

    // Redux cart state
    const dispatch = useZDispatch();
    const items = useZSelector((s) => s.zCart.items);
    const subtotal = useZSelector((s) => s.zCart.subtotal);

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={closeCart}
                className="fixed inset-0 bg-black/40 z-50"
            />

            {/* Drawer */}
            <aside className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl p-4 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">My Cart</h3>
                    <button
                        onClick={closeCart}
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        Close
                    </button>
                </div>

                {/* Items */}
                <div className="mt-4 overflow-y-auto flex-1">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            Your cart is empty 🛒
                        </div>
                    ) : (
                        items.map((it) => (
                          <div
                              key={it.id}
                              className="flex items-center justify-between gap-4 p-3 border rounded mb-3"
                          >
                              <div className="flex items-center gap-3">
                                  <div className="w-16 h-16 overflow-hidden rounded bg-gray-100 flex items-center justify-center">
                                      {it.img && (
                                          <Image
                                              src={it.img}
                                              alt={it.name}
                                              width={64}
                                              height={64}
                                              className="object-cover"
                                          />
                                      )}
                                  </div>

                                  <div>
                                      <div className="font-medium">{it.name}</div>
                                      <div className="text-sm text-gray-500">
                                          ₹ {it.price.toLocaleString("en-IN")}
                                      </div>
                                  </div>
                              </div>

                              <div className="flex flex-col items-end gap-2">
                                  <div className="flex items-center gap-2">
                                      <button
                                          onClick={() => dispatch(decreaseQty(it.id))}
                                          className="w-7 h-7 border rounded"
                                      >
                                          -
                                      </button>
                                      <div>{it.quantity}</div>
                                      <button
                                          onClick={() => dispatch(increaseQty(it.id))}
                                          className="w-7 h-7 border rounded"
                                      >
                                          +
                                      </button>
                                  </div>

                                  <button
                                      onClick={() => dispatch(removeFromCart(it.id))}
                                      className="text-sm text-red-600"
                                  >
                                      Remove
                                  </button>
                              </div>
                </div>
                      ))
                    )}
                </div>

                {/* Footer */}
                <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">Subtotal</div>
                        <div className="font-semibold">
                            ₹ {subtotal.toLocaleString("en-IN")}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href="/cart"
                            onClick={closeCart}
                            className="flex-1 border px-4 py-2 rounded text-center"
                        >
                            View Cart
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}
