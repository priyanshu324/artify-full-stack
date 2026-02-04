"use client";

import React, { useState } from "react";
import CheckoutAddress, { AddressShape } from "./CheckoutAddress";
import CheckoutPayment, { PaymentShape } from "./CheckoutPayment";
import CheckoutItems from "./CheckoutItems";
import CheckoutSummary from "./CheckoutSummary";


export default function CheckoutPage() {
    const [step, setStep] = useState<number>(1);

    // Data collected across steps
    const [address, setAddress] = useState<AddressShape | null>(null);
    const [payment, setPayment] = useState<PaymentShape | null>(null);

    return (
        <section className="max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

            {/* Step indicator */}
            <div className="flex gap-4 mb-8 text-sm">
                <div className={`px-3 py-1 rounded ${step === 1 ? "bg-[#B88E2F] text-white" : "bg-gray-100"}`}>1. Address</div>
                <div className={`px-3 py-1 rounded ${step === 2 ? "bg-[#B88E2F] text-white" : "bg-gray-100"}`}>2. Review</div>
                <div className={`px-3 py-1 rounded ${step === 3 ? "bg-[#B88E2F] text-white" : "bg-gray-100"}`}>3. Payment</div>
                <div className={`px-3 py-1 rounded ${step === 4 ? "bg-[#B88E2F] text-white" : "bg-gray-100"}`}>4. Summary</div>
            </div>

            <div className="bg-white p-6 rounded shadow-sm">
                {step === 1 && (
                    <CheckoutAddress
                        initial={address ?? undefined}
                        onNext={(addr) => { setAddress(addr); setStep(2); }}
                    />
                )}

                {step === 2 && (
                    <CheckoutItems
                        onPrev={() => setStep(1)}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <CheckoutPayment
                        onPrev={() => setStep(2)}
                        onNext={(p) => { setPayment(p); setStep(4); }}
                    />
                )}

                {step === 4 && (
                    <CheckoutSummary
                        address={address}
                        payment={payment}
                        onPrev={() => setStep(3)}
                    />
                )}
            </div>
        </section>
    );
}
