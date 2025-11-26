// src/components/orders/OrderCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Order } from "@/src/types/order";

export default function OrderCard({
    order,
    onView,
}: {
    order: Order;
    onView: (id: string) => void;
}) {
    const first = order.items[0];
    const created = new Date(order.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <div className="border rounded-md p-4 hover:shadow-md transition cursor-pointer">
            <div className="flex items-start gap-4">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    <Image src={first.img} alt={first.name} width={96} height={96} className="object-cover" />
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">{order.id}</h3>
                            <p className="text-sm text-gray-500">{created}</p>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold">Rs. {order.total.toLocaleString("en-IN")}</p>
                            <p className="text-sm text-gray-600">{order.payment.method}</p>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-700">
                        <div>
                            <span className="font-medium">{order.items.length}</span> items —{" "}
                            <span className="text-gray-600">{order.status.replace(/_/g, " ")}</span>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onView(order.id);
                                }}
                                className="px-3 py-1 border rounded text-sm"
                            >
                                View
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // reorder behavior (front-end)
                                    alert("Reorder action (front-end) — implement API later.");
                                }}
                                className="px-3 py-1 bg-[#B88E2F] text-white rounded text-sm"
                            >
                                Reorder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
