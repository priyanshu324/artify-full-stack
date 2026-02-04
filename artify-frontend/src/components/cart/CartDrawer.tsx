"use client";

import React from "react";
import Image from "next/image";
import { FiX, FiTrash2 } from "react-icons/fi";
import { useCartStore } from "@/src/store/cartStore";
import { useUIStore } from "@/src/store/uiStore";

export default function CartDrawer() {
    const { isCartOpen, closeCart } = useUIStore();
    const items = useCartStore((s) => s.items);
    const increaseQty = useCartStore((s) => s.increaseQty);
    const decreaseQty = useCartStore((s) => s.decreaseQty);
    const removeFromCart = useCartStore((s) => s.removeFromCart);

    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (!isCartOpen) return null;

    return (
        <>
            {/* BACKDROP */}
            <div
                onClick={closeCart}
                className="fixed inset-0 bg-black/40 z-50 cursor-pointer"
            />

            {/* DRAWER */}
            <aside
                role="dialog"
                aria-modal
                className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl animate-slideIn"
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">Your Cart</h3>
                    <button
                        onClick={closeCart}
                        aria-label="Close cart"
                        className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                    >
                        <FiX />
                    </button>
                </div>

                {/* CART ITEMS */}
                <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8">
                            Your cart is empty 🛒
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex items-center gap-4 p-3 rounded-md border hover:shadow-sm transition-all"
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="rounded-md object-cover"
                                    />

                                    <div className="flex-1">
                                        <h4 className="font-semibold">{item.name}</h4>
                                        <p className="text-gray-600 text-sm">
                                            Rs. {item.price.toLocaleString("en-IN")}
                                        </p>

                                        {/* Quantity Control */}
                                        <div className="flex items-center gap-3 mt-2">
                                            <button
                                                onClick={() => decreaseQty(item.id)}
                                                className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100 cursor-pointer"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQty(item.id)}
                                                className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100 cursor-pointer"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label="Remove item"
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* FOOTER */}
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="font-semibold">
                            Rs. {totalPrice.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <button
                        onClick={() => {
                            closeCart();
                            window.location.href = "/checkout";
                        }}
                        className="w-full bg-[#B88E2F] text-white py-3 rounded-md font-semibold hover:bg-[#9a7223] cursor-pointer"
                    >
                        Proceed to Checkout
                    </button>
                </div>

                <style jsx>{`
                    .animate-slideIn {
                        animation: slideIn 240ms ease forwards;
                    }
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                        }
                        to {
                            transform: translateX(0%);
                        }
                    }
                `}</style>
            </aside>
        </>
    );
}
