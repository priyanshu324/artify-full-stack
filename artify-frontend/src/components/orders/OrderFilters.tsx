// src/components/orders/OrderFilters.tsx
"use client";

import React from "react";
import type { OrderStatus } from "@/src/types/order";

export default function OrderFilters({
    status,
    setStatus,
    query,
    setQuery,
}: {
    status: OrderStatus | "all";
    setStatus: (s: OrderStatus | "all") => void;
    query: string;
    setQuery: (q: string) => void;
}) {
    const statuses: (OrderStatus | "all")[] = [
        "all",
        "placed",
        "confirmed",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
    ];

    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="border px-3 py-2 rounded"
                >
                    {statuses.map((s) => (
                        <option key={s} value={s}>
                            {s === "all" ? "All" : s.replace(/_/g, " ").toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search order id, product name..."
                    className="border p-2 rounded w-64"
                />
                <button
                    onClick={() => {
                        setStatus("all");
                        setQuery("");
                    }}
                    className="px-3 py-2 border rounded"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
