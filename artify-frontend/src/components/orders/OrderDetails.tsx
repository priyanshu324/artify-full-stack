// src/components/orders/OrderDetails.tsx

"use client";

import { Order } from "@/src/types/order";
import OrderTracking from "./OrderTracking";
import OrderItemsTable from "./OrderItemsTable";

export default function OrderDetails({ order }: { order: Order }) {
    return (
        <div className="space-y-8">
            {/* Top Summary */}
            <div className="border rounded-lg p-6 bg-white">
                <h2 className="text-2xl font-semibold">Order #{order.orderId}</h2>
                <p className="text-gray-500 mt-1">Placed on {order.placedAt}</p>

                <p
                    className={`inline-block mt-3 px-4 py-1 rounded ${order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {order.status}
                </p>
            </div>

            {/* Tracking */}
            <OrderTracking steps={order.tracking} />

            {/* Order Items */}
            <OrderItemsTable items={order.items} />

            {/* Additional Info */}
            <div className="border rounded-lg p-6 bg-white space-y-3">
                <h3 className="text-lg font-semibold">Shipping & Payment</h3>

                <p><strong>Address:</strong> {order.shippingAddress}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

                <p className="font-semibold text-lg pt-4">
                    Total Paid: Rs. {order.totalAmount.toLocaleString("en-IN")}
                </p>
            </div>
        </div>
    );
}
