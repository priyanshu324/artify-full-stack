// src/components/orders/OrderTracking.tsx
"use client";

import React from "react";
import type { Order } from "@/src/types/order";

function statusLabel(status: string) {
    return status.replace(/_/g, " ").toUpperCase();
}

export default function OrderTracking({ order }: { order: Order }) {
    const history = order.tracking?.history ?? [];

    // sort ascending by date
    const sorted = [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <div className="border rounded p-4">
            <h4 className="font-semibold mb-3">Shipment Tracking</h4>
            <div className="text-sm text-gray-600 mb-2">
                Courier: <span className="font-medium">{order.tracking?.courier ?? "-"}</span>
                {order.tracking?.trackingId && <> • Tracking ID: <span className="font-medium">{order.tracking.trackingId}</span></>}
            </div>

            <div className="space-y-3">
                {sorted.map((h, i) => (
                    <div key={i} className="flex gap-3 items-start">
                        <div className="w-3 h-3 rounded-full bg-[#B88E2F] mt-2" />
                        <div>
                            <div className="text-sm font-medium">{statusLabel(h.status)}</div>
                            <div className="text-xs text-gray-500">{new Date(h.date).toLocaleString("en-IN")}</div>
                            {h.note && <div className="text-xs text-gray-700 mt-1">{h.note}</div>}
                        </div>
                    </div>
                ))}

                {sorted.length === 0 && <div className="text-sm text-gray-500">No tracking information yet.</div>}
            </div>
        </div>
    );
}
