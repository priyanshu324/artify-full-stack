// src/components/orders/OrderItemsTable.tsx

"use client";

import Image from "next/image";
import { OrderItem } from "@/src/types/order";

export default function OrderItemsTable({ items }: { items: OrderItem[] }) {
    return (
        <div className="mt-6 border rounded-lg bg-white p-6">
            <h3 className="font-semibold text-lg mb-4">Items</h3>

            <div className="space-y-5">
                {items.map((it) => (
                    <div
                        key={it.id}
                        className="flex justify-between items-center border-b pb-4"
                    >
                        <div className="flex items-center gap-4">
                            <Image
                                src={it.img}
                                alt={it.name}
                                width={70}
                                height={70}
                                className="rounded border"
                            />

                            <div>
                                <p className="font-medium">{it.name}</p>
                                <p className="text-gray-500 text-sm">
                                    Qty: {it.quantity}
                                </p>
                            </div>
                        </div>

                        <p className="font-semibold">
                            Rs. {(it.price * it.quantity).toLocaleString("en-IN")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
