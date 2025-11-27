// src/components/orders/OrderCard.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { Order } from "@/src/types/order";

export default function OrderCard({ order }: { order: Order }) {
    return (
      <Link
          href={`/orders/${order.orderId}`}
          className="border rounded-lg p-5 flex flex-col gap-4 hover:shadow-md transition cursor-pointer bg-white"
      >
          <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Order #{order.orderId}</h3>
              <span
                  className={`px-3 py-1 rounded text-sm ${order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
              >
                  {order.status}
              </span>
          </div>

          <p className="text-gray-600 text-sm">Placed on: {order.placedAt}</p>

          <div className="flex gap-3 mt-3">
              {order.items.slice(0, 3).map((item) => (
                  <Image
                      key={item.id}
                      src={item.img}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover border"
                  />
              ))}
          </div>

          <p className="text-gray-800 font-medium mt-2">
              Total: Rs. {order.totalAmount.toLocaleString("en-IN")}
          </p>
      </Link>
  );
}
