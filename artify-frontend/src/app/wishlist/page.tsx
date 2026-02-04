"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useCartStore } from "@/src/store/cartStore";
import Toast from "@/src/components/ui/Toast";
import { useState, useEffect } from "react";

export default function WishlistPage() {
    const items = useWishlistStore((s) => s.items);
    const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
    const clearWishlist = useWishlistStore((s) => s.clearWishlist);
    const addToCart = useCartStore((s) => s.addToCart);

    const [toast, setToast] = useState<string | null>(null);

    const showToast = (txt: string) => {
        setToast(txt);
        setTimeout(() => setToast(null), 1400);
    };

    // 🟢 Debug logs on every render
    console.log("🔥 WISHLIST ITEMS:", items);
    console.log("🔥 WISHLIST LENGTH:", items.length);

    // 🟢 Debug logs when wishlist changes
    useEffect(() => {
        console.log("🟡 WISHLIST UPDATED:", items);
        console.log("🟡 UPDATED LENGTH:", items.length);
    }, [items]);

    const handleMoveAll = () => {
        console.log("➡️ Move All Pressed — Items:", items);

        if (items.length === 0) return;

        const copy = [...items];

        copy.forEach((it) => {
            console.log("🛒 Adding to cart:", it);
            addToCart({
                id: it.id,
                name: it.name,
                price: it.price,
                img: it.img,
                slug: it.slug,
                quantity: 1,
            });
        });

        console.log("🗑 Clearing wishlist now...");
        clearWishlist();

        showToast("All items moved to cart");
    };

    // if (items.length === 0) {
    //     return (
    //         <div className="py-20 text-center text-gray-600 text-lg">
    //             Your wishlist is empty ❤️
    //             <br />
    //             <Link href="/shop" className="text-[#B88E2F] underline">Continue Shopping</Link>
    //         </div>
    //     );
    // }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>

            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={handleMoveAll}
                    className="bg-[#B88E2F] text-white px-6 py-2 rounded-md hover:bg-[#a77725] transition"
                >
                    Move All to Cart
                </button>

                <button
                    onClick={() => {
                        console.log("🗑 Clear wishlist clicked");
                        clearWishlist();
                        showToast("Wishlist cleared");
                    }}
                    className="text-red-600 underline"
                >
                    Clear Wishlist
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border rounded-lg p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-[90px] h-[90px] rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                                    <Image
                                        src={item.img || "/placeholder.png"}
                                        alt={item.name}
                                        width={90}
                                        height={90}
                                        className="object-cover"
                                    />
                                </div>

                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-500">Rs. {item.price.toLocaleString("en-IN")}</p>

                                    <div className="flex gap-4 mt-3">
                                        <button
                                            onClick={() => {
                                                console.log("🛒 Move ONE item to cart:", item);
                                                addToCart({
                                                    id: item.id,
                                                    name: item.name,
                                                    price: item.price,
                                                    img: item.img,
                                                    slug: item.slug,
                                                    quantity: 1,
                                                });

                                                console.log("🗑 Removing from wishlist:", item.id);
                                                removeFromWishlist(item.id);

                                                showToast(`Moved ${item.name} to cart`);
                                            }}
                                            className="px-4 py-2 bg-[#B88E2F] text-white rounded-md"
                                        >
                                            Move to Cart
                                        </button>

                                        <button
                                            onClick={() => {
                                                console.log("🗑 Removing item:", item.id);
                                                removeFromWishlist(item.id);
                                                showToast(`Removed ${item.name}`);
                                            }}
                                            className="px-4 py-2 text-red-600 underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border rounded-lg p-6 bg-gray-50 h-fit">
                    <h2 className="text-xl font-semibold mb-4">Wishlist Summary</h2>

                    <p className="text-gray-700 mb-2">
                        Items: <span className="font-semibold">{items.length}</span>
                    </p>

                    <p className="text-gray-700 mb-6">
                        Estimated Total:
                        <span className="font-bold">
                            Rs. {items.reduce((acc, it) => acc + it.price, 0).toLocaleString("en-IN")}
                        </span>
                    </p>

                    <Link
                        href="/shop"
                        className="w-full block text-center bg-[#B88E2F] text-white py-3 rounded-md font-semibold hover:bg-[#9b7529] transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>

            {toast && <Toast message={toast} />}
        </section>
    );
}
