// src/components/orders/OrderFilters.tsx

"use client";

import React from "react";

export default function OrderFilters({
    status,
    setStatus,
}: {
        status: string;
        setStatus: (v: string) => void;
    }) {
    return (
      <div className="flex gap-3 mb-6 flex-wrap">
          {["all", "Delivered", "Shipped", "Pending"].map((s) => (
              <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-4 py-2 rounded border text-sm cursor-pointer transition ${status === s
                      ? "bg-[#B88E2F] text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
          >
              {s}
          </button>
      ))}
      </div>
  );
}
