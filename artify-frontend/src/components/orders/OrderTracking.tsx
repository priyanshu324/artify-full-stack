// src/components/orders/OrderTracking.tsx

"use client";

import { OrderTrackingStep } from "@/src/types/order";

export default function OrderTracking({ steps }: { steps: OrderTrackingStep[] }) {
    return (
        <div className="mt-6 border rounded-lg p-6 bg-white">
            <h3 className="font-semibold text-lg mb-4">Tracking</h3>

          <div className="flex flex-col gap-6">
              {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                      <div
                          className={`w-4 h-4 rounded-full mt-1 ${step.completed ? "bg-green-600" : "bg-gray-300"
                              }`}
                      ></div>

                <div>
                    <p className="font-medium">{step.status}</p>
                    <p className="text-gray-500 text-sm">{step.date}</p>
                </div>
            </div>
        ))}
          </div>
      </div>
  );
}
