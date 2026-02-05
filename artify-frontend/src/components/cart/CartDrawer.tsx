"use client";

import Image from "next/image";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import {
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} from "@/src/store/redux/zCart/zCartSlice";
import { useZUiStore } from "@/src/store/zUiStore";

export default function CartDrawer() {
    const dispatch = useZDispatch();
    const items = useZSelector((s) => s.zCart.items);

    const { isCartOpen, closeCart } = useZUiStore();

    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    if (!isCartOpen) return null;

    return (
        <>
            <div
                onClick={closeCart}
                className="fixed inset-0 bg-black/40 z-60"
            />

            <aside className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-70 shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="font-semibold text-lg">My Cart</h3>
                    <button onClick={closeCart}>
                        <FiX />
                    </button>
                </div>

                {/* Items */}
                <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500">
                            Your cart is empty 🛒
                        </p>
                    ) : (
                            items.map((item) => (
                                <div
                                    key={item.id}
                                  className="flex gap-4 border rounded p-3"
                              >
                                  <Image
                                      src={item.img}
                                      alt={item.name}
                                      width={80}
                                      height={80}
                                      className="rounded object-cover"
                                  />

                                  <div className="flex-1">
                                      <h4 className="font-medium">{item.name}</h4>
                                      <p className="text-sm text-gray-500">
                                          Rs. {item.price.toLocaleString("en-IN")}
                                      </p>

                                      <div className="flex items-center gap-2 mt-2">
                                          <button
                                              onClick={() => dispatch(decreaseQty(item.id))}
                                              className="border px-2"
                                          >
                                              −
                                          </button>
                                          <span>{item.quantity}</span>
                                          <button
                                              onClick={() => dispatch(increaseQty(item.id))}
                                              className="border px-2"
                                          >
                                              +
                                          </button>
                                      </div>
                                  </div>

                                  <button
                                      onClick={() => dispatch(removeFromCart(item.id))}
                                      className="text-red-500"
                                  >
                                      <FiTrash2 />
                                  </button>
                              </div>
                          ))
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <div className="flex justify-between mb-4">
                        <span>Subtotal</span>
                        <strong>Rs. {subtotal.toLocaleString("en-IN")}</strong>
                    </div>

                    <button className="w-full bg-[#B88E2F] text-white py-2 rounded">
                        Checkout
                    </button>

                    <button
                        onClick={() => dispatch(clearCart())}
                        className="w-full mt-3 text-sm text-red-600 underline"
                    >
                        Clear Cart
                    </button>
                </div>
            </aside>
        </>
    );
}
