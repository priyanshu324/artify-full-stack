"use client"; // This page will fetch data, so it's a client component for now

import React from "react";
import OrderDetails from "@/src/components/orders/OrderDetails"; // Your existing component
import OrderTracking from "@/src/components/orders/OrderTracking"; // The new component
import { Order } from "@/src/types/order"; // Your main Order type
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

// --- MOCK DATA: In production, you would fetch this from your API ---
// Example: const order = await fetch(`/api/orders/${params.orderId}`).then(res => res.json());
const getMockOrder = (orderId: string): Order => ({
    orderId: orderId,
    placedAt: new Date("2025-12-05T10:30:00Z").toISOString(),
    deliveredAt: new Date("2025-12-10T14:00:00Z").toISOString(),
    status: "Delivered",
    shippingAddress: "123 Art Avenue, Creativity City, 110022, India",
    shippingPhone: "9876543210",
    items: [
        {
            id: 1, name: "Abstract Dreams Canvas", img: "/home/products/product1.svg", price: 4500, quantity: 1
        },
        { id: 2, name: "Ceramic Sculpture 'The Thinker'", img: "/home/products/product1.svg", price: 7800, quantity: 1 },
    ],
    subtotal: 12300,
    shippingFee: 0,
    discount: 1000,
    totalAmount: 11300,
    paymentMethod: "Razorpay",
    tracking: [
        { id: 1, title: "Order Confirmed", note: "Your order has been successfully placed.", date: "2025-12-05T10:31:00Z", completed: true, status: "Confirmed" },
        { id: 2, title: "Processing", note: "The artist is preparing your artwork for shipment.", date: "2025-12-06T11:00:00Z", completed: true, status: "Processing" },
        { id: 3, title: "Packed & Shipped", note: "Your package has been handed over to the courier partner.", date: "2025-12-07T16:45:00Z", completed: true, status: "Shipped" },
        { id: 4, title: "In Transit", note: "The shipment is on its way to your city.", date: "2025-12-09T08:20:00Z", completed: true, status: "In Transit" },
        { id: 5, title: "Delivered", note: "Your artwork has been delivered.", date: "2025-12-10T14:00:00Z", completed: true, status: "Delivered" },
    ],
});

// The Page Component
export default function OrderDetailPage({ params }: { params: { orderId: string } }) {
    // Fetch the mock order data
    const order = getMockOrder(params.orderId);

    if (!order) {
        return <div>Order not found.</div>;
    }

    return (
        <section className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <Link href="/orders" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#B88E2F] mb-4">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to All Orders
                </Link>

                <div className="space-y-8">
                    {/* Use the OrderDetails component you already built */}
                    <OrderDetails order={order} />

                    {/* Use the new OrderTracking component */}
                    <OrderTracking trackingSteps={order.tracking} status={order.status} />
                </div>
            </div>
        </section>
    );
}