"use client";

import React from "react";
import { useCartStore } from "@/src/store/cartStore";
import Image from "next/image";

export default function CheckoutItems({
    onPrev,
    onNext,
}: {
    onPrev: () => void;
    onNext: () => void;
}) {
    const items = useCartStore((s) => s.items);
    const increaseQty = useCartStore((s) => s.increaseQty);
    const decreaseQty = useCartStore((s) => s.decreaseQty);
    const removeFromCart = useCartStore((s) => s.removeFromCart);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Review your items</h2>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border rounded p-4">
                        <div className="flex gap-4 items-center">
                            <Image src={item.img} alt={item.name} width={80} height={80} className="object-cover rounded" />
                            <div>
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description ?? ""}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <button onClick={() => decreaseQty(item.id)} className="px-2 py-1 border rounded">-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => increaseQty(item.id)} className="px-2 py-1 border rounded">+</button>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold">Rs. {(item.price * item.quantity).toLocaleString("en-IN")}</div>
                            <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600 mt-2">Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between mt-8">
                <button onClick={onPrev} className="px-6 py-2 border rounded">Back</button>
                <button onClick={onNext} className="px-6 py-2 bg-[#B88E2F] text-white rounded">Continue</button>
            </div>
        </div>
    );
}
