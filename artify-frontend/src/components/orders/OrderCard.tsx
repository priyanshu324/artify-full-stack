"use client";
import React from "react";
import type { Order } from "@/src/types/order";
import Link from "next/link";

export default function OrderCard({ order }: { order: Order }) {
    return (
      <div className="border rounded p-4 flex flex-col md:flex-row justify-between gap-4">
          <div className="flex gap-4 items-start">
              <div className="text-sm text-gray-500">{order.placedAt}</div>
              <div>
                  <div className="font-semibold text-lg">Order #{order.orderId}</div>
                  <div className="text-sm text-gray-600">{order.items.map(i => i.name).slice(0, 2).join(", ")}{order.items.length > 2 ? ` +${order.items.length - 2} more` : ""}</div>
                  <div className="text-sm mt-2">Total: Rs. {order.totalAmount.toLocaleString("en-IN")}</div>
              </div>
          </div>

          <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded text-sm ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{order.status}</div>
              <Link href={`/orders/${order.orderId}`} className="px-4 py-2 border rounded">View</Link>
              <Link href={`/order-summary/${order.orderId}`} className="px-4 py-2 bg-gray-50 border rounded">Receipt</Link>
          </div>
      </div>
  );
}