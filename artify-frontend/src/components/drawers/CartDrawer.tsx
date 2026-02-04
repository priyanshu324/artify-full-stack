// src/components/drawers/CartDrawer.tsx
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/src/store/cartStore";
import { useUIStore } from "@/src/store/uiStore";

export default function CartDrawer() {
    const { isCartOpen, closeCart } = useUIStore();
    const items = useCartStore((s) => s.items);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const increaseQty = useCartStore((s) => s.increaseQty);
    const decreaseQty = useCartStore((s) => s.decreaseQty);
    const subtotal = useCartStore((s) => s.getSubtotal());

    if (!isCartOpen) return null;
    return (
        <>
            <div onClick={closeCart} className="fixed inset-0 bg-black/40 z-50" />
            <aside className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl p-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">My Cart</h3>
                    <button onClick={closeCart} className="p-2 rounded hover:bg-gray-100">Close</button>
                </div>

                <div className="mt-4 overflow-y-auto h-[calc(100%-200px)]">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">Your cart is empty 🛒</div>
                    ) : (
                            items.map((it) => (
                                <div key={it.id} className="flex items-center justify-between gap-4 p-3 border rounded mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-16 h-16 overflow-hidden rounded bg-gray-100">
                                            {it.img && <Image src={it.img} alt={it.name} width={64} height={64} className="object-cover" />}
                                        </div>
                                        <div>
                                            <div className="font-medium">{it.name}</div>
                                            <div className="text-sm text-gray-500">Rp {it.price.toLocaleString("id-ID")}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => decreaseQty(it.id)} className="w-7 h-7 border rounded">-</button>
                                            <div>{it.quantity}</div>
                                            <button onClick={() => increaseQty(it.id)} className="w-7 h-7 border rounded">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(it.id)} className="text-sm text-red-600">Remove</button>
                                    </div>
                </div>
                            ))
                    )}
                </div>

                <div className="border-t p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">Subtotal</div>
                        <div className="font-semibold">Rp {subtotal.toLocaleString("id-ID")}</div>
                    </div>

                    <div className="flex gap-2">
                        <Link href="/cart" onClick={closeCart} className="flex-1 border px-4 py-2 rounded text-center">View Cart</Link>
                        {/* <button className="flex-1 bg-[#B88E2F] text-white px-4 py-2 rounded">Checkout</button> */}
                    </div>
                </div>
            </aside>
        </>
    );
}
