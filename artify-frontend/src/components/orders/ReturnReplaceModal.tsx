"use client";

import React, { useState } from "react";
import type { Order } from "@/src/types/order";
import { FiX } from "react-icons/fi";

interface Props {
    order: Order;
    onClose: () => void;
    onSubmitted: (orderId: string, data: any) => void;
}

export default function ReturnReplaceModal({
    order,
    onClose,
    onSubmitted,
}: Props) {
    const [type, setType] = useState<"return" | "replace" | "">("");
    const [reason, setReason] = useState("");
    const [pickup, setPickup] = useState<"home" | "drop-off" | "">("");

    const handleSubmit = () => {
        if (!type || !reason.trim() || !pickup) return;

        onSubmitted(order.orderId, {
            type,
            reason,
            pickupMethod: pickup,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-white w-full max-w-lg rounded-lg p-6 shadow-lg animate-fadeIn z-100">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Return / Replace</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-gray-100"
                    >
                        <FiX size={20} />
                    </button>
                </div>

                <p className="text-gray-600 text-sm mt-2">
                    Select what you want to request for your order.
                </p>

                {/* Return or Replace */}
                <div className="mt-4">
                    <p className="text-sm font-semibold mb-1">Request Type</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setType("return")}
                            className={`px-4 py-2 rounded border ${type === "return"
                                ? "bg-[#B88E2F] text-white"
                                : "bg-white hover:bg-gray-50"
                                }`}
                        >
                            Return
                        </button>

                        <button
                            onClick={() => setType("replace")}
                            className={`px-4 py-2 rounded border ${type === "replace"
                                ? "bg-[#B88E2F] text-white"
                                : "bg-white hover:bg-gray-50"
                                }`}
                        >
                            Replace
                        </button>
                    </div>
                </div>

                {/* Reason */}
                <div className="mt-6">
                    <p className="text-sm font-semibold mb-1">Reason</p>
                    <textarea
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Describe the issue..."
                        className="w-full p-3 border rounded bg-gray-50 outline-none focus:ring-[#B88E2F]"
                    />
                </div>

                {/* Pickup Method */}
                <div className="mt-6">
                    <p className="text-sm font-semibold mb-1">Pickup Method</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setPickup("home")}
                            className={`px-4 py-2 rounded border ${pickup === "home"
                                ? "bg-[#B88E2F] text-white"
                                : "bg-white hover:bg-gray-50"
                                }`}
                        >
                            Home Pickup
                        </button>

                        <button
                            onClick={() => setPickup("drop-off")}
                            className={`px-4 py-2 rounded border ${pickup === "drop-off"
                                ? "bg-[#B88E2F] text-white"
                                : "bg-white hover:bg-gray-50"
                                }`}
                        >
                            Drop-off Point
                        </button>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border hover:bg-gray-50"
                    >
                        Close
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={!type || !reason.trim() || !pickup}
                        className={`
              px-5 py-2 rounded text-white transition
              ${type && reason.trim() && pickup
                                ? "bg-[#B88E2F] hover:bg-[#a27a28]"
                                : "bg-gray-300 cursor-not-allowed"
                            }
            `}
                    >
                        Submit Request
                    </button>
                </div>
            </div>

            {/* Animation */}
            <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
        </div>
    );
}
