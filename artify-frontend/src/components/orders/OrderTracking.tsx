"use client";

import React from "react";
import { TrackingStep } from "@/src/types/order";
import { CheckIcon, CubeIcon, TruckIcon, HomeIcon } from "@heroicons/react/24/outline";

// Helper to get the right icon for each step title
const getIconForStep = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("confirmed")) return <CheckIcon className="w-6 h-6" />;
    if (lowerTitle.includes("processing") || lowerTitle.includes("packed")) return <CubeIcon className="w-6 h-6" />;
    if (lowerTitle.includes("shipped") || lowerTitle.includes("transit")) return <TruckIcon className="w-6 h-6" />;
    if (lowerTitle.includes("delivered")) return <HomeIcon className="w-6 h-6" />;
    return <CheckIcon className="w-6 h-6" />;
};

interface OrderTrackingProps {
    trackingSteps?: TrackingStep[];
    status: string;
}

// Using a default value `[]` prevents crashes and ensures the map function always works.
export default function OrderTracking({ trackingSteps = [], status }: OrderTrackingProps) {
    const isOrderDelivered = status === 'delivered';

    return (
        <div className="border rounded-lg p-6 bg-white">
            <h2 className="text-xl font-semibold mb-6">Order Tracking</h2>
            <div className="relative">
                <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200" aria-hidden="true"></div>
                <ul className="space-y-8">
                    {trackingSteps.map((step) => (
                        <li key={step.id} className="relative flex items-start">
                            <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full ${step.completed ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                                {getIconForStep(step.title)}
                            </div>
                            <div className="ml-4">
                                <h4 className={`font-semibold ${step.completed ? "text-gray-800" : "text-gray-500"}`}>{step.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{step.note}</p>
                                <p className="text-xs text-gray-400 mt-1">{new Date(step.date).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {isOrderDelivered && (
                <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="font-semibold text-green-800">Your order has been delivered!</p>
                </div>
            )}
        </div>
    );
}