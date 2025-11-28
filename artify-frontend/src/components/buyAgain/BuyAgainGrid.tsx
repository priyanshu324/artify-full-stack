// src/components/buyAgain/BuyAgainGrid.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useCartStore } from "@/src/store/cartStore";
import { orders } from "@/src/data/orders";

export default function BuyAgainGrid() {
    const addToCart = useCartStore((s) => s.addToCart);

    const freq = new Map<number, { count: number, item: any }>();
    orders.forEach(o => o.items.forEach(it => {
        const e = freq.get(it.id) || { count: 0, item: it };
        e.count += 1;
        freq.set(it.id, e);
    }));

    const items = Array.from(freq.values()).sort((a, b) => b.count - a.count).slice(0, 8).map(v => v.item);

    return (
        <section className="bg-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h3 className="text-xl font-semibold mb-4">Buy Again</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((p: any) => (
                        <div key={p.id} className="p-3 border rounded text-center">
                            <div className="h-28 flex items-center justify-center">
                                <Image src={p.img} alt={p.name} width={120} height={120} className="object-contain" />
                            </div>
                            <div className="mt-2 font-medium">{p.name}</div>
                            <div className="text-sm text-gray-600">Rp {p.price.toLocaleString("id-ID")}</div>
                            <button onClick={() => addToCart({ id: p.id, name: p.name, price: p.price, img: p.img, slug: p.slug, quantity: 1 })} className="mt-2 px-3 py-2 bg-[#B88E2F] text-white rounded">Add</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
