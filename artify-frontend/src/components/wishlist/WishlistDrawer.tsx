"use client";

import React from "react";
import Image from "next/image";
import { FiX, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useCartStore } from "@/src/store/cartStore";
import { useUIStore } from "@/src/store/uiStore";

export default function WishlistDrawer() {
    const { isWishlistOpen, closeWishlist } = useUIStore();
    const items = useWishlistStore((s) => s.items);
    const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
    const addToCart = useCartStore((s) => s.addToCart);

    const subtotal = items.reduce((acc, it) => acc + it.price, 0);

    if (!isWishlistOpen) return null;

    return (
        <>
            {/* BACKDROP */}
            <div
                onClick={closeWishlist}
                className="fixed inset-0 bg-black/40 z-50 cursor-pointer"
            />

            {/* DRAWER */}
            <aside
                role="dialog"
                aria-modal
                className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl animate-slideIn"
            >
                {/* HEADER */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">My Wishlist ❤️</h3>
                    <button
                        onClick={closeWishlist}
                        className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                        aria-label="Close Wishlist"
                    >
                        <FiX />
                    </button>
                </div>

                {/* LIST */}
                <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                    {items.length === 0 ? (
                        <p className="text-center text-gray-500 mt-8">
                            Your wishlist is empty ❤️
                        </p>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((it) => (
                                <li
                                    key={it.id}
                                    className="flex items-center gap-4 p-3 rounded-md border hover:shadow-sm transition-all"
                                >
                                    <Image
                                        src={it.img}
                                        alt={it.name}
                                        width={80}
                                        height={80}
                                        className="rounded-md"
                                    />

                                    <div className="flex-1">
                                        <h4 className="font-semibold">{it.name}</h4>
                                        <p className="text-xs text-gray-500">{it.slug}</p>
                                        <p className="font-medium mt-2">
                                            Rs. {it.price.toLocaleString("en-IN")}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2 items-end">
                                        <button
                                            onClick={() => {
                                                addToCart({
                                                    id: it.id,
                                                    name: it.name,
                                                    price: it.price,
                                                    img: it.img,
                                                    slug: it.slug,
                                                    quantity: 1,
                                                });
                                                removeFromWishlist(it.id);
                                            }}
                                            className="flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-[#B88E2F] text-white hover:bg-[#a2751f] cursor-pointer"
                                        >
                                            <FiShoppingCart /> Add
                                        </button>

                                        <button
                                            onClick={() => removeFromWishlist(it.id)}
                                            aria-label={`Remove ${it.name}`}
                                            className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                        >
                                            <FiTrash2 className="text-gray-600" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* FOOTER */}
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="font-semibold">
                            Rs. {subtotal.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="flex gap-3">
                        {/* VIEW WISHLIST BUTTON */}
                        <button
                            onClick={() => {
                                closeWishlist();
                                window.location.href = "/wishlist";
                            }}
                            className="flex-1 border border-gray-300 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-50"
                        >
                            View Wishlist
                        </button>

                        {/* ADD ALL TO CART */}
                        <button
                            onClick={() => {
                                items.forEach((it) =>
                                    addToCart({
                                        id: it.id,
                                        name: it.name,
                                        price: it.price,
                                        img: it.img,
                                        slug: it.slug,
                                        quantity: 1,
                                    })
                                );
                                items.forEach((it) => removeFromWishlist(it.id));
                                closeWishlist();
                            }}
                            className="flex-1 bg-[#B88E2F] text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#a2751f]"
                        >
                            Add All to Cart
                        </button>
                    </div>
                </div>

                <style jsx>{`
                    .animate-slideIn {
                        animation: slideIn 240ms ease forwards;
                    }
                    @keyframes slideIn {
                        from {
                            transform: translateX(100%);
                        }
                        to {
                            transform: translateX(0%);
                        }
                    }
                `}</style>
            </aside>
        </>
    );
}
