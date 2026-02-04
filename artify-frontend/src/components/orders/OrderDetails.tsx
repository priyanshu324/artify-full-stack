"use client";

import { useState } from "react";
import Image from "next/image";
import { Order, OrderItem, TrackingStep, ReturnRequest } from "@/src/types/order";
import ReorderModal from "./ReorderModal";

interface Props {
    order: Order;
}

export default function OrderDetails({ order }: Props) {
    const [localOrder, setLocalOrder] = useState<Order>(order);

    const [showReorderModal, setShowReorderModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

    // ---------------- CANCEL ORDER ----------------
    const handleCancelOrder = () => {
        const cancelStep: TrackingStep = {
            id: localOrder.tracking.length + 1,
            title: "Order Cancelled",
            status: `Cancelled — ${new Date().toLocaleDateString()}`,
            date: new Date().toISOString(),
            completed: true,
            note: "The order was cancelled by the user.",
        };

        setLocalOrder((prev) => ({
            ...prev,
            status: "Cancelled",
            tracking: [...prev.tracking, cancelStep],
        }));
    };

    // ---------------- RETURN REQUEST ----------------
    const handleRequestReturn = () => {
        const req: ReturnRequest = {
            id: `RET-${Date.now()}`,
            type: "return",
            requestedAt: new Date().toISOString(),
            reason: "Requested by user",
        };

        setLocalOrder((prev) => ({
            ...prev,
            status: "Return Requested",
            returnRequest: req,
        }));
    };

    // ---------------- REPLACE REQUEST ----------------
    const handleRequestReplacement = () => {
        const req: ReturnRequest = {
            id: `REP-${Date.now()}`,
            type: "replace",
            requestedAt: new Date().toISOString(),
            reason: "Replacement requested by user",
        };

        setLocalOrder((prev) => ({
            ...prev,
            status: "Replace Requested",
            returnRequest: req,
        }));
    };

    return (
        <section className="max-w-5xl mx-auto py-10 px-4">

            {/* ORDER HEADER */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Order #{localOrder.orderId}</h1>
                <p className="text-gray-600">Placed on {localOrder.placedAt}</p>
                <p className="mt-1 text-gray-700 font-semibold">
                    Status: {localOrder.status}
                </p>
            </div>

            {/* SHIPPING */}
            <div className="border p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-1">Shipping Address</h2>
                <p>{localOrder.shippingAddress}</p>
                {localOrder.shippingPhone && (
                    <p className="text-gray-500 mt-1">Phone: {localOrder.shippingPhone}</p>
                )}
            </div>

            {/* TRACKING */}
            <div className="border p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-3">Tracking</h2>
                {localOrder.tracking.map((step) => (
                    <div key={step.id} className="flex gap-3 mb-3">
                        <div className={`w-4 h-4 rounded-full ${step.completed ? "bg-green-600" : "bg-gray-300"}`} />
                        <div>
                            <p className="font-medium">{step.title}</p>
                            <p className="text-sm text-gray-600">{step.status}</p>
                            <p className="text-xs text-gray-400">{step.date}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ITEMS */}
            <div className="border p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-4">Items</h2>

                {localOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-4 border-b last:border-none">
                        <div className="flex gap-4">
                            <Image src={item.img} alt={item.name} width={70} height={70} />
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                <p className="font-semibold">Rp {item.price.toLocaleString("id-ID")}</p>
                            </div>
                        </div>

                      <button
                          onClick={() => {
                              setSelectedItem(item);
                              setShowReorderModal(true);
                          }}
                          className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                          Buy Again
                      </button>
                  </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="border p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-4">Order Summary</h2>

                <div className="flex justify-between py-1 text-sm">
                    <span>Subtotal</span>
                    <span>Rp {localOrder.subtotal.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between py-1 text-sm">
                    <span>Shipping</span>
                    <span>
                        {localOrder.shippingFee === 0
                            ? "FREE"
                            : `Rp ${localOrder.shippingFee.toLocaleString("id-ID")}`}
                    </span>
                </div>

                {localOrder.discount !== undefined && (
                    <div className="flex justify-between py-1 text-sm text-green-600">
                        <span>Discount</span>
                        <span>- Rp {localOrder.discount.toLocaleString("id-ID")}</span>
                    </div>
                )}

                <div className="flex justify-between pt-3 mt-2 border-t font-semibold text-lg">
                    <span>Total</span>
                    <span>Rp {localOrder.totalAmount.toLocaleString("id-ID")}</span>
                </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
                {localOrder.status !== "Cancelled" &&
                    localOrder.status !== "Delivered" && (
                        <button
                            onClick={handleCancelOrder}
                            className="px-4 py-2 border rounded text-red-600 hover:bg-red-50"
                        >
                            Cancel Order
                        </button>
                    )}

                {localOrder.status === "Delivered" && (
                    <>
                        <button
                            onClick={handleRequestReturn}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Request Return
                        </button>
                        <button
                            onClick={handleRequestReplacement}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Request Replacement
                        </button>
                    </>
                )}
            </div>

            {/* REORDER MODAL */}
            {selectedItem && (
                <ReorderModal
                    open={showReorderModal}
                    onClose={() => setShowReorderModal(false)}
                    item={selectedItem}
                />
            )}
        </section>
    );
}
