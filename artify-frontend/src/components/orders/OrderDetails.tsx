// src/components/orders/OrderDetails.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Order } from "@/src/types/order";
import OrderTracking from "./OrderTracking";

export default function OrderDetails({
    order,
    onClose,
}: {
    order: Order;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex">
            <div onClick={onClose} className="fixed inset-0 bg-black/40" />
            <aside className="relative w-full sm:w-[900px] bg-white p-6 overflow-y-auto ml-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Order {order.id}</h2>
                    <div className="flex gap-2">
                        <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
                        <button
                            onClick={() => {
                                // placeholder download invoice
                                alert("Download invoice (placeholder). Implement backend PDF generation.");
                            }}
                            className="px-3 py-1 bg-gray-100 rounded"
                        >
                            Download Invoice
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-3">Items</h3>
                            <div className="space-y-3">
                                {order.items.map((it) => (
                                    <div key={it.id} className="flex items-center gap-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                                            <Image src={it.img} alt={it.name} width={80} height={80} className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="font-medium">{it.name}</div>
                                                    <div className="text-sm text-gray-500">Qty: {it.qty}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-semibold">Rs. {(it.price * it.qty).toLocaleString("en-IN")}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-3">Shipping Address</h3>
                            <div className="text-sm">
                                <div className="font-medium">{order.shipping.name} — {order.shipping.phone}</div>
                                <div>{order.shipping.address}</div>
                                <div>{order.shipping.city}, {order.shipping.state} — {order.shipping.pincode}</div>
                            </div>
                        </div>

                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-3">Order Activity</h3>
                            <div className="text-sm text-gray-600">
                                <div>Placed: {new Date(order.createdAt).toLocaleString("en-IN")}</div>
                                <div>Payment: {order.payment.status.toUpperCase()}</div>
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-4">
                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-3">Summary</h3>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between"><span>Subtotal</span><span>Rs. {order.subtotal.toLocaleString("en-IN")}</span></div>
                                <div className="flex justify-between"><span>Discount</span><span>- Rs. {(order.discount ?? 0).toLocaleString("en-IN")}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>Rs. {order.shippingCost.toLocaleString("en-IN")}</span></div>
                                <hr />
                                <div className="flex justify-between font-semibold text-lg mt-2"><span>Total</span><span>Rs. {order.total.toLocaleString("en-IN")}</span></div>
                            </div>
                        </div>

                        <OrderTracking order={order} />

                        <div className="border rounded p-4">
                            <h3 className="font-semibold mb-3">Actions</h3>
                            <div className="flex flex-col gap-2">
                                <button className="px-3 py-2 border rounded">Contact support</button>
                                {order.status !== "cancelled" && order.status !== "delivered" && (
                                    <button className="px-3 py-2 bg-red-600 text-white rounded">Request cancellation</button>
                                )}
                                {order.status === "delivered" && (
                                    <button className="px-3 py-2 bg-yellow-500 text-white rounded">Start return</button>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </aside>
        </div>
    );
}
