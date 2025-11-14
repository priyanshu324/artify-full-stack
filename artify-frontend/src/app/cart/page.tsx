"use client";

import { useCartStore } from "@/src/store/cartStore";
import Image from "next/image";

export default function CartPage() {
    const { items, increaseQty, decreaseQty, removeFromCart, clearCart, totalPrice } =
        useCartStore();

    if (items.length === 0) {
        return <div className="py-20 text-center text-gray-600">Your cart is empty 🛒</div>;
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-16">
            <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT: Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border rounded-lg p-4"
                        >
                            <div className="flex items-center gap-4">
                                <Image src={item.img} alt={item.name} width={90} height={90} />

                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-500">Rs. {item.price.toLocaleString()}</p>

                                    <div className="flex gap-3 mt-2">
                                        <button onClick={() => decreaseQty(item.id)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => increaseQty(item.id)}>+</button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                {/* RIGHT: Summary */}
                <div className="border rounded-lg p-6 bg-gray-50">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <p className="text-gray-700 mb-4">
                        Total: <span className="font-bold">Rs. {totalPrice.toLocaleString()}</span>
                    </p>

                    <button className="w-full bg-[#B88E2F] text-white py-3 rounded-md font-semibold">
                        Proceed to Checkout
                    </button>

                    <button
                        onClick={clearCart}
                        className="w-full mt-4 py-2 text-gray-600 underline"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </section>
    );
}
