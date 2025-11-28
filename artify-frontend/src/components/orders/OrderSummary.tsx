// src/components/orders/OrderSummary.tsx
"use client";

import React, { useRef } from "react";
import type { Order } from "@/src/types/order";
import Image from "next/image";

export default function OrderSummary({ order }: { order: Order }) {
    const ref = useRef<HTMLDivElement | null>(null);

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-2xl font-bold">Invoice — {order.orderId}</h2>
                    <p className="text-sm text-gray-500">Placed: {order.placedAt}</p>
                </div>

                <div className="text-right">
                    <div className="text-sm">Payment: {order.paymentMethod ?? "—"}</div>
                    <div className="text-sm">Status: {order.status}</div>
                </div>
            </div>

            <div className="mt-6">
                {order.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center border-b py-3">
                        <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                                <Image src={it.img} width={64} height={64} alt={it.name} />
                            </div>
                            <div>
                                <div className="font-medium">{it.name}</div>
                                <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                            </div>
                        </div>
                        <div>Rs. {(it.price * it.quantity).toLocaleString("en-IN")}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-right">
                <div className="text-sm text-gray-500">Subtotal: Rs. {order.subtotal.toLocaleString("en-IN")}</div>
                <div className="text-sm text-gray-500">Shipping: Rs. {order.shippingFee.toLocaleString("en-IN")}</div>
                <div className="text-xl font-bold mt-2">Total: Rs. {order.totalAmount.toLocaleString("en-IN")}</div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
                <button className="px-4 py-2 border rounded" onClick={() => window.print()}>
                    Print
                </button>
                <a className="px-4 py-2 border rounded" href={`/api/orders/${order.orderId}/invoice`}>
                    Download PDF
                </a>
            </div>
        </div>
    );
}
