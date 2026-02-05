"use client";

import React from "react";
import Image from "next/image";

import { useZDispatch } from "@/src/store/redux/hooks";
import { addToCart } from "@/src/store/redux/zCart/zCartSlice";

interface BuyAgainItem {
    id: number;
    name: string;
    price: number;
    img: string;
    slug: string;
}

export default function BuyAgainCard({ item }: { item: BuyAgainItem }) {
    const dispatch = useZDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: item.id,
                name: item.name,
                price: item.price,
                img: item.img,
                slug: item.slug,
                quantity: 1,
                description: undefined
            })
        );
    };

    return (
        <div className="border rounded p-4 flex flex-col items-center">
            <div className="w-44 h-44 bg-gray-100 flex items-center justify-center mb-3">
                <Image
                    src={item.img}
                    width={176}
                    height={176}
                    alt={item.name}
                    className="object-cover"
                />
            </div>

            <div className="text-center font-medium">{item.name}</div>

            <div className="mt-2 font-semibold">
                Rs. {item.price.toLocaleString("en-IN")}
            </div>

            <button
                onClick={handleAddToCart}
                className="mt-3 px-4 py-2 bg-[#B88E2F] text-white rounded cursor-pointer hover:opacity-95"
            >
                Add to cart
            </button>
        </div>
    );
}
