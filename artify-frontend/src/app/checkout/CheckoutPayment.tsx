"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { IconType } from "react-icons";
// We don't need the react-icons for cards if we are using images
// import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal } from "react-icons/fa";

// Define the type for the payment method
export type PaymentMethod = "visa" | "mastercard" | "paypal" | "cod";

// --- Create a data structure for our payment options ---
const paymentOptions: { id: PaymentMethod; name: string; image: string }[] = [
    { id: "visa", name: "Credit/Debit Card (Visa)", image: "/visa.svg" },
    { id: "mastercard", name: "Credit/Debit Card (MasterCard)", image: "/master.svg" },
    { id: "cod", name: "Cash On Delivery", image: "/visa.svg" }, // Assuming you have a cod.svg
    { id: "paypal", name: "PayPal", image: "/Paypal.svg" },
];

interface CheckoutPaymentProps {
    selectedMethod: PaymentMethod;
    onMethodChange: (method: PaymentMethod) => void;
}

export default function CheckoutPayment({ selectedMethod, onMethodChange }: CheckoutPaymentProps) {
    // --- STATE FOR THE CARD DETAILS FORM ---
    // In a real app, this state would be managed by the secure payment gateway component.
    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });
    const [saveCard, setSaveCard] = useState(true);

    // --- DERIVED STATE: Check if a card method is selected to show the form ---
    const isCardMethodSelected = selectedMethod === 'visa' || selectedMethod === 'mastercard';

    return (
        <div className="mt-6">
            <div className="border rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {/* Map over the payment options to create the list */}
                    {paymentOptions.map((option) => {
                        const isSelected = selectedMethod === option.id;

                        return (
                            <li
                                key={option.id}
                                onClick={() => onMethodChange(option.id)}
                                className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${isSelected ? "bg-[#f9f1e7]" : "hover:bg-gray-50"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <Image src={option.image} alt={option.name} width={40} height={25} />
                                    <span className="text-lg font-medium text-gray-800">{option.name}</span>
                                </div>
                                {!isSelected && <ChevronRightIcon className="w-6 h-6 text-gray-400" />}
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* --- CONDITIONALLY RENDERED CARD DETAILS FORM --- */}
            {isCardMethodSelected && (
                <div className="mt-6 p-6 border rounded-lg bg-white transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-4">Enter Card Details</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Card Number */}
                            <input
                                type="text"
                                placeholder="Card Number"
                                className="border p-3 rounded-md w-full sm:col-span-2"
                            // value={cardDetails.number} - In a real app, this would be controlled by the payment provider
                            />
                            {/* Cardholder Name */}
                            <input
                                type="text"
                                placeholder="Name on Card"
                                className="border p-3 rounded-md w-full sm:col-span-2"
                            // value={cardDetails.name}
                            />
                            {/* Expiry Date */}
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="border p-3 rounded-md w-full"
                            // value={cardDetails.expiry}
                            />
                            {/* CVV */}
                            <input
                                type="text"
                                placeholder="CVV"
                                className="border p-3 rounded-md w-full"
                            // value={cardDetails.cvv}
                            />
                        </div>
                        {/* Save Card Checkbox */}
                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                id="saveCard"
                                checked={saveCard}
                                onChange={(e) => setSaveCard(e.target.checked)}
                                className="h-5 w-5 rounded text-[#B88E2F] focus:ring-[#B88E2F]"
                            />
                            <label htmlFor="saveCard" className="text-sm text-gray-700">
                                Save this card for future payments
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 pt-2">
                            🔒 Your card details are securely processed by our payment partner and are not stored on our servers.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}