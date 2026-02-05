"use client";

import React, { useState } from "react";
import { useCartStore } from "@/src/store/cartStore";
import { useRouter } from "next/navigation";
import type { AddressShape } from "./CheckoutAddress";
import type { PaymentShape } from "./CheckoutPayment";
import { useWishlistStore } from "@/src/store/wishlistStore";

export default function CheckoutSummary({
    address,
    payment,
    onPrev,
}: {
    address: AddressShape | null;
    payment: PaymentShape | null;
    onPrev: () => void;
}) {
    const items = useWishlistStore((s) => s.items);
    const router = useRouter();
    const subtotal = items.reduce((acc, it) => acc + it.price, 0);
    const clearCart = useCartStore((s) => s.clearCart);

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const shipping = subtotal > 1000 ? 0 : 150;
    const total = Math.max(0, subtotal - discount) + shipping;

    const applyCoupon = () => {
        // Example coupon logic — replace with API check
        if (coupon.trim().toUpperCase() === "ART10") {
            setDiscount(Math.floor(subtotal * 0.1)); // 10% off
        } else if (coupon.trim().toUpperCase() === "FLAT50") {
            setDiscount(50);
        } else {
            alert("Invalid coupon code");
        }
    };

    const placeOrder = async () => {
        if (!address) return alert("Missing address");
        if (!payment) return alert("Select payment method");
        // In production: call your backend to create order, process payment via Razorpay/Stripe etc.
        // Mock order creation:
        const order = {
            id: `ORD-${Date.now()}`,
            subtotal,
            discount,
            shipping,
            total,
            address,
            payment,
        };

        // clear cart then navigate to success page
        clearCart();
        router.push(`/checkout/success?orderId=${order.id}`);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="border rounded p-4">
                        <h3 className="font-semibold mb-2">Shipping to</h3>
                        <div className="text-sm">
                            {address ? (
                                <>
                                    <div>{address.fullName} — {address.phone}</div>
                                    <div>{address.address}</div>
                                    <div>{address.city}, {address.state} — {address.pincode}</div>
                                    {address.landmark && <div className="text-gray-500">Landmark: {address.landmark}</div>}
                                </>
                            ) : <div className="text-red-600">No address selected</div>}
                        </div>
                    </div>

                    <div className="border rounded p-4">
                        <h3 className="font-semibold mb-2">Payment</h3>
                        <div className="text-sm">
                            {payment ? <div>Method: {payment.method.toUpperCase()}</div> : <div className="text-red-600">No payment selected</div>}
                        </div>
                    </div>

                    <div className="border rounded p-4">
                        <h3 className="font-semibold mb-2">Apply coupon</h3>
                        <div className="flex gap-2">
                            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} className="border p-2 rounded flex-1" placeholder="Enter coupon code" />
                            <button onClick={applyCoupon} className="px-4 py-2 bg-[#B88E2F] text-white rounded">Apply</button>
                        </div>
                        {discount > 0 && <div className="mt-2 text-sm text-green-700">Discount applied: Rs. {discount}</div>}
                    </div>
                </div>

                <aside className="border rounded p-4 bg-gray-50">
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span>Discount</span>
                        <span>- Rs. {discount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Shipping</span>
                        <span>{shipping === 0 ? "Free" : `Rs. ${shipping}`}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between mt-4 font-semibold text-lg">
                        <span>Total</span>
                        <span>Rs. {total.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex gap-2 mt-6">
                        <button onClick={onPrev} className="flex-1 px-4 py-2 border rounded">Back</button>
                        <button onClick={placeOrder} className="flex-1 px-4 py-2 bg-green-600 text-white rounded">Place Order</button>
                    </div>
                </aside>
            </div>
        </div>
    );
}