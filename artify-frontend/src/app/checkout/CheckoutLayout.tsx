"use client";

import React, { useState, useEffect } from "react";
import { useZSelector } from "@/src/store/redux/hooks";

/**
 * StickyOrderSummary
 * - Uses Redux cart state (zCart)
 * - Keeps hydration-safe skeleton
 */
const StickyOrderSummary = () => {
    // Hydration safety flag
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // ✅ Redux cart state
    const items = useZSelector((state) => state.zCart.items);

    // Derived values (selectors can be added later if needed)
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    // Skeleton (server + initial client render match)
    if (!isClient) {
        return (
            <aside className="sticky top-24 border rounded-lg p-6 bg-gray-50 h-fit animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <hr className="my-4" />
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
            </aside>
        );
    }

    // Real content (client only)
    return (
        <aside className="sticky top-24 border rounded-lg p-6 bg-gray-50 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="space-y-2 text-sm">
                {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <span className="truncate pr-4">
                            {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium whitespace-nowrap">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                    </div>
                ))}
            </div>

            <hr className="my-4" />

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>

                <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
            </div>
        </aside>
    );
};

/**
 * CheckoutLayout
 * - Structural layout only
 * - No store logic here (correct architecture)
 */
export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <main className="lg:col-span-2 space-y-6">{children}</main>

                <StickyOrderSummary />
            </div>
        </section>
    );
}
