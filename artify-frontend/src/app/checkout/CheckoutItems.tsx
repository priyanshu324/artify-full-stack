"use client";

import React from "react";
import Image from "next/image";

import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import {
    increaseQty,
    decreaseQty,
    removeFromCart,
} from "@/src/store/redux/zCart/zCartSlice";

export default function CheckoutItems() {
    const dispatch = useZDispatch();

    // ✅ Redux state instead of Zustand
    const items = useZSelector((state) => state.zCart.items);

    if (items.length === 0) {
        return <p className="text-gray-500 text-sm">Your cart is empty.</p>;
    }

    return (
      <div className="space-y-4">
          {items.map((item) => (
          <div
              key={item.id}
              className="flex items-start justify-between border-b pb-4 last:border-b-0 last:pb-0"
          >
              {/* LEFT SIDE */}
              <div className="flex gap-4 items-center">
                  <Image
                      src={item.img}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover rounded-md"
                  />

                  <div>
                      <h3 className="font-medium text-base">{item.name}</h3>

                      {item.description && (
                          <p className="text-sm text-gray-600">{item.description}</p>
                      )}

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                          <button
                              onClick={() => dispatch(decreaseQty(item.id))}
                              className="px-2 py-1 border rounded w-8 h-8 flex items-center justify-center"
                          >
                              -
                          </button>

                          <span className="font-semibold">{item.quantity}</span>

                          <button
                              onClick={() => dispatch(increaseQty(item.id))}
                              className="px-2 py-1 border rounded w-8 h-8 flex items-center justify-center"
                          >
                              +
                          </button>
                      </div>
                  </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="text-right">
                  <div className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>

                  <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-xs text-red-600 hover:underline mt-2"
                  >
                      Remove
                  </button>
              </div>
          </div>
      ))}
      </div>
  );
}
