"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Success() {
    const sp = useSearchParams();
    const orderId = sp?.get("orderId") ?? "—";

    return (
        <div className="py-20 text-center">
            <h1 className="text-3xl font-semibold mb-4">Order Confirmed 🎉</h1>
            <p className="mb-6 text-gray-600">Thanks! Your order <strong>{orderId}</strong> has been placed. You will receive email / SMS updates.</p>

            <div className="flex justify-center gap-4">
                <Link href="/" className="px-6 py-2 border rounded">Continue shopping</Link>
                <Link href="/orders" className="px-6 py-2 bg-[#B88E2F] text-white rounded">View orders</Link>
            </div>
        </div>
    );
}
