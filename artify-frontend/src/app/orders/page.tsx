// src/app/orders/page.tsx
"use client";

import React from "react";
import OrderList from "@/src/components/orders/OrderList";

export default function OrdersPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
            <p className="text-gray-600 mb-6">Track, view and manage your orders here.</p>

            <OrderList />
        </main>
    );
}
