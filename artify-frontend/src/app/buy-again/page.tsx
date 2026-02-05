"use client";


import BuyAgainCard from "@/src/components/orders/BuyAgainCard";
import { orders } from "@/src/data/orders";

export default function BuyAgainPage() {
    // simple logic: pick items from last 5 orders, unique by id
    const items = orders.flatMap(o => o.items).reduce((acc: any, it: any) => {
        if (!acc.find((x: any) => x.id === it.id)) acc.push(it);
        return acc;
    }, [] as any[]);
    return (
        <section className="max-w-7xl mx-auto px-4 py-12 pt-20">
            <h1 className="text-2xl font-semibold mb-6">Buy Again</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {items.map((it: any) => <BuyAgainCard key={it.id} item={it} />)}
            </div>
        </section>
    );
}