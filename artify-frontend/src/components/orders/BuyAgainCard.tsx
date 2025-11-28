"use client";
import React from "react";
import Image from "next/image";
import { useCartStore } from "@/src/store/cartStore";

export default function BuyAgainCard({ item }: { item: any }) {
    const addToCart = useCartStore(s => s.addToCart);
    return (
        <div className="border rounded p-4 flex flex-col items-center">
            <div className="w-44 h-44 bg-gray-100 flex items-center justify-center mb-3">
                <Image src={item.img} width={176} height={176} alt={item.name} className="object-cover" />
            </div>
            <div className="text-center font-medium">{item.name}</div>
            <div className="mt-2 font-semibold">Rs. {item.price.toLocaleString("en-IN")}</div>
            <button onClick={() => addToCart({ ...item, quantity: 1 })} className="mt-3 px-4 py-2 bg-[#B88E2F] text-white rounded cursor-pointer">Add to cart</button>
        </div>
    );
}
