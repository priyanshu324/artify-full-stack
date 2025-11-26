// src/components/orders/OrderList.tsx
"use client";

import React, { useMemo, useState } from "react";
import { orders as mockOrders } from "@/src/data/orders";
import type { Order } from "@/src/types/order";
import OrderCard from "./OrderCard";
import OrderDetails from "./OrderDetails";
import OrderFilters from "./OrderFilters";

export default function OrderList() {
    const [status, setStatus] = useState<"all" | any>("all");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 6;

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const data = mockOrders; // swap to fetch from API later

    const filtered = useMemo(() => {
        let res = data.slice();
        if (status !== "all") {
            res = res.filter((o) => o.status === status);
        }
        if (query.trim()) {
            const q = query.toLowerCase();
            res = res.filter(
                (o) =>
                    o.id.toLowerCase().includes(q) ||
                    o.items.some((it) => it.name.toLowerCase().includes(q))
            );
        }
        return res;
    }, [data, status, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div>
            <OrderFilters status={status} setStatus={setStatus} query={query} setQuery={setQuery} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginated.map((order) => (
                    <div key={order.id}>
                        <OrderCard order={order} onView={(id) => setSelectedOrder(order)} />
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-600">
                    Showing {(page - 1) * perPage + 1} –{" "}
                    {Math.min(page * perPage, filtered.length)} of {filtered.length} orders
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-3 py-1 border rounded"
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <div className="text-sm">
                        {page} / {totalPages}
                    </div>
                    <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="px-3 py-1 border rounded"
                        disabled={page === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {selectedOrder && (
                <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    );
}
