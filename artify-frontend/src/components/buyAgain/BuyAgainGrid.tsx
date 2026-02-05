// src/components/buyAgain/BuyAgainGrid.tsx
"use client";

import React, { useMemo } from "react";
import Image from "next/image";

import { orders } from "@/src/data/orders";
import type { OrderItem } from "@/src/types/order";

import { useZDispatch } from "@/src/store/redux/hooks";
import { addToCart } from "@/src/store/redux/zCart/zCartSlice";

export default function BuyAgainGrid() {
    const dispatch = useZDispatch();

    /**
     * Build "Buy Again" list based on frequency
     * (same logic Amazon uses internally)
     */
    const items = useMemo(() => {
        const freq = new Map<number, { count: number; item: OrderItem }>();

        orders.forEach((order) => {
            order.items.forEach((it) => {
                const existing = freq.get(it.id) ?? { count: 0, item: it };
                existing.count += 1;
                freq.set(it.id, existing);
            });
        });

        return Array.from(freq.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 8)
            .map((v) => v.item);
    }, []);

    return (
        <section className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-xl font-semibold mb-4">Buy Again</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((p) => (
                        <div
                            key={p.id}
                            className="p-3 border rounded text-center hover:shadow-sm transition"
                        >
                            <div className="h-28 flex items-center justify-center">
                                <Image
                                    src={p.img}
                                    alt={p.name}
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                />
                            </div>

                            <div className="mt-2 font-medium truncate">{p.name}</div>
                            <div className="text-sm text-gray-600">
                                ₹ {p.price.toLocaleString("en-IN")}
                            </div>

                            <button
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            id: p.id,
                                            name: p.name,
                                            price: p.price,
                                            img: p.img,
                                            slug: p.slug,
                                            quantity: 1,
                                            description: undefined
                                        })
                                    )
                                }
                                className="mt-2 px-3 py-2 bg-[#B88E2F] text-white rounded hover:opacity-95"
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
