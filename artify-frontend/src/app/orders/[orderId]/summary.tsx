"use client";

import { notFound } from "next/navigation";
import { orders } from "@/src/data/orders";

interface Props { params: { orderId: string } }

export default function OrderSummary({ params }: Props) {
    const order = orders.find((o) => o.orderId === params.orderId);
    if (!order) return notFound();

    return (
        <main className="p-8 bg-white print:p-0">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-xl font-bold mb-2">Invoice — {order.orderId}</h1>
                <p className="text-sm text-gray-600 mb-6">Placed: {order.placedAt}</p>

                <div className="border rounded p-4 mb-4">
                    {order.items.map((it) => (
                        <div key={it.id} className="flex justify-between py-2">
                            <div>{it.name} x{it.quantity}</div>
                            <div>Rp {(it.price * it.quantity).toLocaleString("id-ID")}</div>
                        </div>
                    ))}
                </div>

                <div className="text-right">
                    <div className="mb-2">Subtotal: Rp {order.subtotal.toLocaleString("id-ID")}</div>
                    <div className="mb-2">Shipping: Rp {order.shippingFee.toLocaleString("id-ID")}</div>
                    <div className="text-lg font-bold">Total: Rp {order.totalAmount.toLocaleString("id-ID")}</div>
                </div>

                <div className="mt-6">
                    <button onClick={() => (typeof window !== "undefined" ? window.print() : undefined)} className="px-4 py-2 border">Print</button>
                </div>
            </div>
        </main>
    );
}