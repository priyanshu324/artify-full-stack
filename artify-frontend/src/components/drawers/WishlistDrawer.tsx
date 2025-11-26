"use client";

import Image from "next/image";
import Drawer from "../ui/Drawer";
import { useWishlistStore } from "@/src/store/wishlistStore";
import { useCartStore } from "@/src/store/cartStore";

export default function WishlistDrawer({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { items, removeFromWishlist, bulkMoveToCart } = useWishlistStore();
    const addToCart = useCartStore((s) => s.addToCart);

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-6">My Wishlist ❤️</h2>

            {items.length === 0 ? (
                <p className="text-gray-600 text-center mt-10">No wishlist items</p>
            ) : (
                <>
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <Image src={item.img} alt={item.name} width={70} height={70} />

                                <div className="flex-1">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-500">
                                        Rs. {item.price.toLocaleString("en-IN")}
                                    </p>

                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="text-red-500 text-sm underline mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => bulkMoveToCart(addToCart)}
                        className="w-full mt-8 bg-[#B88E2F] text-white py-3 rounded-md"
                    >
                        Move All to Cart
                    </button>
                </>
            )}
        </Drawer>
    );
}
