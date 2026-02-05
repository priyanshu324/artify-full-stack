// src/components/orders/OrderItemsTable.tsx
"use client";

import React from "react";
import Image from "next/image";
import type { Order } from "@/src/types/order";

export default function OrderItemsTable({ order }: { order: Order }) {
    return (
        <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Items in this order</h3>

            <div className="space-y-4">
                {order.items.map((it) => (
                    <div key={it.id} className="flex items-center gap-4 border rounded p-3">
                        <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                            <Image src={it.img} alt={it.name} width={96} height={96} className="object-cover" />
                        </div>

                        <div className="flex-1">
                            <div className="font-medium">{it.name}</div>
                            <div className="text-sm text-gray-500">Qty: {it.quantity}</div>
                        </div>

                        <div className="text-right">
                            <div className="font-semibold">Rs. {(it.price * it.quantity).toLocaleString("en-IN")}</div>
                            <div className="text-sm text-gray-500">Rs. {it.price.toLocaleString("en-IN")} each</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-end gap-4">
                <div className="text-right">
                    <div className="text-sm text-gray-500">Subtotal</div>
                    <div className="font-semibold">Rs. {order.subtotal.toLocaleString("en-IN")}</div>

                    <div className="text-sm text-gray-500 mt-1">Shipping</div>
                    <div className="font-semibold">Rs. {order.shippingFee.toLocaleString("en-IN")}</div>

                    {order.discount ? (
                        <>
                            <div className="text-sm text-gray-500 mt-1">Discount</div>
                            <div className="font-semibold">- Rs. {order.discount.toLocaleString("en-IN")}</div>
                        </>
                    ) : null}

                    <div className="text-sm text-gray-500 mt-2">Total</div>
                    <div className="text-xl font-bold">Rs. {order.totalAmount.toLocaleString("en-IN")}</div>
                </div>
            </div>
        </div>
    );
}