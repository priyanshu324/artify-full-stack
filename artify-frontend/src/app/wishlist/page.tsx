"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/src/store/wishlistStore";

export default function WishlistPage() {
    const { items, removeFromWishlist } = useWishlistStore();

    if (items.length === 0)
        return (
            <div className="py-20 text-center text-gray-500">
                Your Wishlist is empty ❤️
            </div>
        );

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold mb-10">My Wishlist</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {items.map((item) => (
                    <div key={item.id} className="bg-white shadow p-4 rounded-lg">
                        <Image
                            src={item.img}
                            width={300}
                            height={300}
                            alt={item.name}
                            className="rounded"
                        />

                        <h3 className="mt-4 font-semibold">{item.name}</h3>
                        <p className="text-gray-500">Rp {item.price.toLocaleString("id-ID")}</p>

                        <div className="flex justify-between mt-4">
                            <Link
                                href={`/shop/${item.slug}`}
                                className="text-[#B88E2F] font-medium"
                            >
                                View
                            </Link>

                            <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-red-500 font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
