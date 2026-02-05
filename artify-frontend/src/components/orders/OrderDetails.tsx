"use client";

import { useState } from "react";
import Image from "next/image";
import { Order, OrderItem, TrackingStep, ReturnRequest } from "@/src/types/order";

// --- IMPORT THE NEW MODALS ---
import CancelOrderModal from "./CancelOrderModal";
import ReturnRequestModal from "./ReturnReplaceModal";
import Link from "next/link";

interface Props {
    order: Order;
}

export default function OrderDetails({ order }: Props) {
    const [localOrder, setLocalOrder] = useState<Order>(order);

    // --- STATE TO CONTROL MODAL VISIBILITY ---
    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [isReturnModalOpen, setReturnModalOpen] = useState(false);

    // --- HANDLER FOR CONFIRMING CANCELLATION ---
    const handleConfirmCancel = () => {
        const cancelStep: TrackingStep = {
            id: localOrder.tracking.length + 1,
            title: "Order Cancelled",
            status: `Cancelled by user on ${new Date().toLocaleDateString()}`,
            date: new Date().toISOString(),
            completed: true,
            note: "The order was cancelled by the user before shipping.",
        };

        setLocalOrder((prev) => ({
            ...prev,
            status: "Cancelled",
            tracking: [prev.tracking[0], cancelStep], // Keep only the 'confirmed' and 'cancelled' steps
        }));
    };

    // --- HANDLER FOR SUBMITTING A RETURN/REPLACEMENT ---
    const handleConfirmReturn = (request: ReturnRequest) => {
        setLocalOrder((prev) => ({
            ...prev,
            status: request.type === 'return' ? "Return Requested" : "Replace Requested",
            returnRequest: request,
        }));
    };

    // --- DETERMINE WHICH BUTTONS TO SHOW ---
    const canCancel = ["Pending", "Processing"].includes(localOrder.status);
    const canReturn = localOrder.status === "Delivered";

    return (
        <div className="border rounded-lg p-6 bg-white">
            {/* ORDER HEADER */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">Order #{localOrder.orderId}</h1>
                    <p className="text-sm text-gray-600">Placed on {new Date(localOrder.placedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full 
                    ${localOrder.status === 'Delivered' ? 'bg-green-100 text-green-800' : ''}
                    ${localOrder.status === 'Cancelled' ? 'bg-red-100 text-red-800' : ''}
                    ${localOrder.status === 'Processing' || localOrder.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : ''}
                `}>
                    {localOrder.status}
                </span>
            </div>

            {/* ITEMS (Removed buttons from here for clarity, they are now at the bottom) */}
            <div className="border-t border-b py-4">
                <h3 className="font-semibold mb-4">Items</h3>
                {localOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-4 last:mb-0">
                        <div className="flex gap-4">
                            <Image src={item.img} alt={item.name} width={70} height={70} className="rounded-md" />
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                        </div>
                        <p className="font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                    </div>
                ))}
            </div>

            {/* SUMMARY & ADDRESS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                    <h3 className="font-semibold mb-2">Order Summary</h3>
                    <div className="text-sm space-y-1">
                        <div className="flex justify-between"><span>Subtotal</span><span>₹{localOrder.subtotal.toLocaleString("en-IN")}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span>{localOrder.shippingFee === 0 ? "FREE" : `₹${localOrder.shippingFee}`}</span></div>
                        {localOrder.discount && <div className="flex justify-between text-green-600"><span>Discount</span><span>- ₹{localOrder.discount.toLocaleString("en-IN")}</span></div>}
                        <div className="flex justify-between font-bold text-base pt-2 border-t mt-2"><span>Total</span><span>₹{localOrder.totalAmount.toLocaleString("en-IN")}</span></div>
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <p className="text-sm text-gray-600">{localOrder.shippingAddress}</p>
                </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div className="flex gap-3 mt-8 border-t pt-6">
                {canCancel && (
                    <button onClick={() => setCancelModalOpen(true)} className="px-4 py-2 border rounded text-red-600 hover:bg-red-50 font-medium">
                        Cancel Order
                    </button>
                )}
                {canReturn && (
                    <button onClick={() => setReturnModalOpen(true)} className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 font-medium">
                        Request Return or Replacement
                    </button>
                )}
                <Link href="/shop" className="px-4 py-2 bg-[#B88E2F] text-white rounded font-medium">
                    Buy Again
                </Link>
            </div>

            {/* --- MODALS (Rendered but hidden until opened) --- */}
            <CancelOrderModal
                isOpen={isCancelModalOpen}
                onClose={() => setCancelModalOpen(false)}
                onConfirm={handleConfirmCancel}
                orderId={localOrder.orderId}
            />
            <ReturnRequestModal
                isOpen={isReturnModalOpen}
                onClose={() => setReturnModalOpen(false)}
                onSubmit={handleConfirmReturn}
                orderId={localOrder.orderId}
            />
        </div>
    );
}