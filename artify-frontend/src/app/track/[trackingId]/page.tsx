"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Order } from "@/src/types/order";
import OrderTracking from "@/src/components/orders/OrderTracking"; // Import the component

// MOCK DATA FUNCTION: In a real app, this would be an API call
// We are re-using the same mock data structure for consistency.
const getMockOrderByTrackingId = (trackingId: string): Order | null => {
    // In a real scenario, you might fetch data here.
    // For now, we return a consistent mock object regardless of the ID.
    if (!trackingId) return null;

    return {
        orderId: trackingId,
        placedAt: new Date("2025-12-05T10:30:00Z").toISOString(),
        status: "Shipped", // Let's use a different status for this example
        shippingAddress: "123 Art Avenue, Creativity City, 110022, India",
        items: [
            { id: 1, name: "Abstract Dreams Canvas", img: "/shop/thumb1.svg", price: 4500, quantity: 1 }
        ],
        subtotal: 4500,
        shippingFee: 0,
        totalAmount: 4500,
        tracking: [
            { id: 1, title: "Order Confirmed", note: "Your order has been successfully placed.", date: "2025-12-05T10:31:00Z", completed: true, status: "Confirmed" },
            { id: 2, title: "Processing", note: "The artist is preparing your artwork.", date: "2025-12-06T11:00:00Z", completed: true, status: "Processing" },
            { id: 3, title: "Packed & Shipped", note: "Your package is on its way.", date: "2025-12-07T16:45:00Z", completed: true, status: "Shipped" },
            { id: 4, title: "In Transit", note: "The shipment is approaching your city.", date: "2025-12-09T08:20:00Z", completed: false, status: "In Transit" },
            { id: 5, title: "Delivered", note: "Your artwork has been delivered.", date: "2025-12-10T14:00:00Z", completed: false, status: "Delivered" },
        ],
    };
};


// The Page Component
export default function TrackShipmentPage() {
    const params = useParams();
    const trackingId = params.trackingId as string;

    // Fetch the mock order data using the ID from the URL
    const order = getMockOrderByTrackingId(trackingId);

    if (!order) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">Order Not Found</h2>
                <p className="text-gray-500 mt-2">We could not find any shipment with the ID: {trackingId}</p>
            </div>
        );
    }

    return (
        <section className="bg-white py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Track Shipment</h1>
                    <p className="text-lg text-gray-500 mt-2">Order ID: <span className="font-semibold text-gray-900">{order.orderId}</span></p>
                </div>

                {/* 
                  THIS IS THE CRUCIAL PART:
                  We are now correctly passing the `order.tracking` array and `order.status` string
                  as props to the OrderTracking component.
                */}
                <OrderTracking trackingSteps={order.tracking} status={order.status} />
            </div>
        </section>
    );
}