// src/components/orders/OrderTracking.tsx
"use client";
import React from "react";
import type { TrackingStep } from "@/src/types/order";

export default function OrderTracking({ steps }: { steps: TrackingStep[] }) {
    return (
        <div className="space-y-4 ">
            {steps.map((s) => (
                <div key={s.id} className="flex items-start gap-4">
                    <div className={`mt-1 w-3 h-3 rounded-full ${s.completed ? "bg-[#B88E2F]" : "bg-gray-300"}`} />
                    <div>
                        <div className="font-medium">{s.title}</div>
                        <div className="text-sm text-gray-500">{s.completed}</div>
                        <div className="text-xs text-gray-400 mt-1">{s.date}</div>
                    </div>
                </div>
            ))}
      </div>
  );
}
