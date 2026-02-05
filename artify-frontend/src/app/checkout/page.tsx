"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import CheckoutAddress, { AddressShape } from "./CheckoutAddress";
import CheckoutPayment, { PaymentMethod } from "./CheckoutPayment";
import CheckoutItems from "./CheckoutItems";
import CheckoutLayout from "./CheckoutLayout";

// ✅ Redux hooks
import { useZSelector, useZDispatch } from "@/src/store/redux/hooks";
import { clearCart } from "@/src/store/redux/zCart/zCartSlice";

export default function CheckoutPage() {
    const router = useRouter();
    const dispatch = useZDispatch();

    // ✅ Redux cart state
    const items = useZSelector((state) => state.zCart.items);

    // Derived subtotal (Amazon-style)
    const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    // UI state (LOCAL — NOT Redux)
    const [activeSection, setActiveSection] = useState<"address" | "payment">(
        "address"
    );
    const [shippingAddress, setShippingAddress] =
        useState<AddressShape | null>(null);

    // Valid default payment method
    const [paymentMethod, setPaymentMethod] =
        useState<PaymentMethod>("visa");

    const handlePlaceOrder = () => {
        if (!shippingAddress) {
            alert("Please complete the shipping address.");
            return;
        }

        console.log("Placing Order:", {
            shippingAddress,
            paymentMethod,
            items,
            subtotal,
        });

        // Online payment check
        const isOnlinePayment =
            paymentMethod === "visa" ||
            paymentMethod === "mastercard" ||
            paymentMethod === "paypal";

        const mockOrderId = isOnlinePayment
            ? `ARTIFY-ONLINE-${Date.now()}`
            : `ARTIFY-COD-${Date.now()}`;

        // ✅ Clear cart via Redux
        dispatch(clearCart());

        // Redirect
        router.push(`/checkout/success?orderId=${mockOrderId}`);
    };

    return (
        <CheckoutLayout>
            {/* 1️⃣ Shipping Address */}
            <div className="border rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">1. Shipping Address</h2>

                    {shippingAddress && activeSection !== "address" && (
                        <button
                            onClick={() => setActiveSection("address")}
                            className="text-sm font-medium text-[#B88E2F] cursor-pointer"
                        >
                            Change
                        </button>
                    )}
                </div>

                {activeSection === "address" ? (
                    <CheckoutAddress
                        onNext={(addr) => {
                            setShippingAddress(addr);
                            setActiveSection("payment");
                        }}
                    />
                ) : (
                    shippingAddress && (
                        <div className="text-sm mt-4 text-gray-600">
                            <p className="font-semibold">{shippingAddress.fullName}</p>
                            <p>
                                {shippingAddress.address}, {shippingAddress.city},{" "}
                                {shippingAddress.state} - {shippingAddress.pincode}
                            </p>
                            <p>Phone: {shippingAddress.phone}</p>
                        </div>
                    )
                )}
            </div>

            {/* 2️⃣ Review Items */}
            <div className="border rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">2. Review Items</h2>
                <CheckoutItems />
            </div>

            {/* 3️⃣ Payment Method */}
            <div
                className={`border rounded-lg p-6 ${!shippingAddress ? "opacity-50 pointer-events-none" : ""
                    }`}
            >
                <h2 className="text-xl font-semibold">3. Payment Method</h2>

                {shippingAddress ? (
                    <CheckoutPayment
                        selectedMethod={paymentMethod}
                        onMethodChange={setPaymentMethod}
                    />
                ) : (
                    <p className="text-sm text-gray-500 mt-2">
                        Complete your address to select a payment method.
                    </p>
                )}
            </div>

            {/* 4️⃣ Place Order */}
            <div className="flex justify-end mt-4">
                <button
                    onClick={handlePlaceOrder}
                    disabled={!shippingAddress || items.length === 0}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
                >
                    Place Order
                </button>
            </div>
        </CheckoutLayout>
    );
}
