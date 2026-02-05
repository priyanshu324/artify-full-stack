"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircleIcon } from '@heroicons/react/24/solid'; // This line will now work correctly

// The actual component that uses the search parameters
const SuccessContent = () => {  
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId") ?? "—";

    return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="bg-gray-50 border border-dashed rounded-lg p-4 mb-8 inline-block">
                <p className="text-gray-700">Your Order ID is:</p>
                <p className="font-mono text-xl font-bold tracking-wider">{orderId}</p>
            </div>
            <p className="text-sm text-gray-500 mb-8">You will receive an email confirmation shortly with your order details and tracking information.</p>
            
            <div className="flex justify-center gap-4">
                <Link href="/shop" className="px-6 py-2 border rounded-md hover:bg-gray-100">
                    Continue Shopping
                </Link>
                <Link href={`/orders/${orderId}`} className="px-6 py-2 bg-[#B88E2F] text-white rounded-md hover:opacity-90">
                    Track Order
                </Link>
            </div>
        </div>
    );
}

// The page component wraps the content in a Suspense boundary, which is a best practice
// for components that use `useSearchParams`.
export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}