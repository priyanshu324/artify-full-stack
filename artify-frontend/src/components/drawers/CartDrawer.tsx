"use client";

import Image from "next/image";
import Drawer from "../ui/Drawer";
import { useCartStore } from "@/src/store/cartStore";

export default function CartDrawer({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { items, increaseQty, decreaseQty, removeFromCart, totalPrice } =
        useCartStore();

    return (
        <Drawer isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-semibold mb-6">Your Cart</h2>

            {items.length === 0 ? (
                <p className="text-gray-600 text-center mt-10">Cart is empty 🛒</p>
            ) : (
                <div className="space-y-6">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                            <Image src={item.img} alt={item.name} width={70} height={70} />

                            <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-500">
                                    Rs. {item.price.toLocaleString("en-IN")}
                                </p>

                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        onClick={() => decreaseQty(item.id)}
                                        className="px-2 border"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => increaseQty(item.id)}
                                        className="px-2 border"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 text-sm underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-10 border-t pt-6">
                <p className="text-lg font-semibold">
                    Total: Rs. {totalPrice.toLocaleString("en-IN")}
                </p>

                <button className="w-full mt-4 bg-[#B88E2F] text-white py-3 rounded-md">
                    Go to Checkout
                </button>
            </div>
        </Drawer>
    );
}
