"use client";

import React, { useState } from "react";

export type PaymentShape = {
    method: "cod" | "upi" | "card" | "netbanking";
    details?: Record<string, string>;
};

export default function CheckoutPayment({
    onPrev,
    onNext,
}: {
    onPrev: () => void;
    onNext: (p: PaymentShape) => void;
}) {
    const [method, setMethod] = useState<PaymentShape["method"] | "">("");
    const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>

            <div className="space-y-3">
                <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                    <input type="radio" name="pay" value="cod" onChange={() => setMethod("cod")} />
                    Cash on delivery
                </label>

                <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                    <input type="radio" name="pay" value="upi" onChange={() => setMethod("upi")} />
                    UPI (Pay using UPI apps)
                </label>

                <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                    <input type="radio" name="pay" value="card" onChange={() => setMethod("card")} />
                    Credit / Debit card
                </label>

                {method === "card" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                        <input value={card.number} onChange={(e) => setCard((s) => ({ ...s, number: e.target.value }))} placeholder="Card number" className="border p-2 rounded" />
                        <input value={card.name} onChange={(e) => setCard((s) => ({ ...s, name: e.target.value }))} placeholder="Name on card" className="border p-2 rounded" />
                        <input value={card.expiry} onChange={(e) => setCard((s) => ({ ...s, expiry: e.target.value }))} placeholder="MM/YY" className="border p-2 rounded" />
                        <input value={card.cvv} onChange={(e) => setCard((s) => ({ ...s, cvv: e.target.value }))} placeholder="CVV" className="border p-2 rounded" />
                    </div>
                )}

                <label className="flex items-center gap-3 border p-3 rounded cursor-pointer">
                    <input type="radio" name="pay" value="netbanking" onChange={() => setMethod("netbanking")} />
                    Net banking
                </label>
            </div>

            <div className="flex justify-between mt-8">
                <button onClick={onPrev} className="px-6 py-2 border rounded">Back</button>

                <button
                    onClick={() => {
                        if (!method) return alert("Please pick a payment method");
                        const payload: PaymentShape = {
                            method: method as PaymentShape["method"],
                            details: method === "card" ? card : undefined,
                        };
                        onNext(payload);
                    }}
                    className="px-6 py-2 bg-[#B88E2F] text-white rounded"
                >
                    Continue
                </button>
            </div>

            <p className="text-xs text-gray-500 mt-3">
                Note: This page contains placeholders for payment UI. For production you need
                server-side payment order creation (Razorpay/Stripe) and secure keys.
            </p>
        </div>
    );
}
