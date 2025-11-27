// src/components/orders/OrderList.tsx

"use client";

import React, { useState } from "react";
import { orders } from "@/src/data/orders"; // TODO (Backend)
import OrderCard from "./OrderCard";
import OrderFilters from "./OrderFilters";

export default function OrderList() {
    const [status, setStatus] = useState("all");

    const filtered = status === "all"
        ? orders
        : orders.filter((o) => o.status === status);

    return (
        <div>
          <OrderFilters status={status} setStatus={setStatus} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((order) => (
                  <OrderCard key={order.orderId} order={order} />
              ))}
          </div>

          {filtered.length === 0 && (
              <p className="text-gray-500 mt-10">No orders found.</p>
          )}
      </div>
  );
}
