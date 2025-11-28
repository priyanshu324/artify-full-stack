"use client";

import React, { useState } from "react";
import type { Order } from "@/src/types/order";
import { FiX } from "react-icons/fi";

interface Props {
    order: Order;
    onClose: () => void;
    onCancelled: (orderId: string, reason: string) => void;
}

export default function CancelOrderModal({
    order,
    onClose,
    onCancelled,
}: Props) {
    const [reason, setReason] = useState("");

    const handleSubmit = () => {
        if (!reason.trim()) return;
        onCancelled(order.orderId, reason);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-md rounded-lg p-6 shadow-lg animate-fadeIn z-100">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Cancel Order</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <p className="text-gray-600 text-sm mt-2">
                    Please tell us why you want to cancel this order.
                </p>

                {/* Reason Input */}
                <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full mt-4 p-3 border rounded-md bg-gray-50 focus:ring-[#B88E2F] focus:border-[#B88E2F] outline-none"
                    rows={4}
                    placeholder="Enter cancellation reason..."
                />

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border hover:bg-gray-50"
                    >
                        Close
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={!reason.trim()}
                        className={`px-5 py-2 rounded text-white transition 
              ${reason.trim()
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-red-300 cursor-not-allowed"
                            }`}
                    >
                        Cancel Order
                    </button>
                </div>
            </div>

            {/* Animations */}
            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
