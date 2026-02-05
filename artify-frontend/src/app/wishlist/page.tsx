"use client";

import Image from "next/image";
import Link from "next/link";
import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import { removeFromWishlist, clearWishlist } from "@/src/store/redux/zWishlist/zWishlistSlice";
import { addToCart } from "@/src/store/redux/zCart/zCartSlice";
import Toast from "@/src/components/ui/Toast";
import { useState } from "react";

export default function WishlistPage() {
    const dispatch = useZDispatch();
    const items = useZSelector(state => state.zWishlist.items);

    const [toast, setToast] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(null), 1500);
    };

    if (items.length === 0) {
        return (
            <div className="py-20 text-center text-gray-600">
                Wishlist is empty ❤️
                <br />
                <Link href="/shop" className="text-[#B88E2F] underline">
                    Continue shopping
                </Link>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold mb-8">My Wishlist</h1>

            <div className="flex justify-between mb-6">
                <button
                    onClick={() => {
                        items.forEach(it =>
                            dispatch(addToCart({
                                ...it, quantity: 1,
                                description: undefined
                            }))
                        );
                        dispatch(clearWishlist());
                        showToast("All items moved to cart");
                    }}
                    className="bg-[#B88E2F] text-white px-6 py-2 rounded"
                >
                    Move All to Cart
                </button>

                <button
                    onClick={() => {
                        dispatch(clearWishlist());
                        showToast("Wishlist cleared");
                    }}
                    className="text-red-600 underline"
                >
                    Clear Wishlist
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                    {items.map(item => (
                        <div key={item.id} className="flex gap-4 border p-4 rounded">
                            <Image
                              src={item.img}
                              alt={item.name}
                              width={90}
                              height={90}
                              className="rounded object-cover"
                          />

                          <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-gray-500">
                                  Rs. {item.price.toLocaleString("en-IN")}
                              </p>

                              <div className="flex gap-4 mt-3">
                                  <button
                                      onClick={() => {
                                          dispatch(addToCart({
                                              ...item, quantity: 1,
                                              description: undefined
                                          }));
                                          dispatch(removeFromWishlist(item.id));
                                          showToast(`Moved ${item.name} to cart`);
                                      }}
                                      className="bg-[#B88E2F] text-white px-4 py-2 rounded"
                                  >
                                      Move to Cart
                                  </button>

                                  <button
                                      onClick={() => {
                                          dispatch(removeFromWishlist(item.id));
                                          showToast(`Removed ${item.name}`);
                                      }}
                                      className="text-red-600 underline"
                                  >
                                      Remove
                                  </button>
                              </div>
                          </div>
                      </div>
                  ))}
                </div>

                <div className="border p-6 bg-gray-50 rounded h-fit">
                    <h2 className="text-xl font-semibold mb-4">Wishlist Summary</h2>
                    <p>Items: {items.length}</p>
                    <p className="mt-2 font-bold">
                        Total: Rs. {items.reduce((a, b) => a + b.price, 0).toLocaleString("en-IN")}
                    </p>
                </div>
            </div>

            {toast && <Toast message={toast} />}
        </section>
    );
}
