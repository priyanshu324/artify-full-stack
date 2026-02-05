"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiTrash2, FiShoppingCart } from "react-icons/fi";

import { useZUiStore } from "@/src/store/zUiStore";

import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import {
    removeFromWishlist,
    clearWishlist,
} from "@/src/store/redux/zWishlist/zWishlistSlice";
import { addToCart } from "@/src/store/redux/zCart/zCartSlice";

export default function WishlistDrawer() {
    const { isWishlistOpen, closeWishlist } = useZUiStore();

    const dispatch = useZDispatch();
    const items = useZSelector((s) => s.zWishlist.items);

    const subtotal = items.reduce((acc, it) => acc + it.price, 0);

    if (!isWishlistOpen) return null;

    const handleAddAllToCart = () => {
        if (items.length === 0) return;

        items.forEach((it) => {
            dispatch(addToCart({
                ...it, quantity: 1,
                description: undefined
            }));
        });

        dispatch(clearWishlist());
        closeWishlist();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={closeWishlist}
                className="fixed inset-0 bg-black/40 z-50"
            />

            {/* Drawer */}
            <aside
                role="dialog"
                aria-modal
                className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl animate-slideIn flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">My Wishlist</h3>
                    <button
                        onClick={closeWishlist}
                        aria-label="Close wishlist"
                        className="p-2 rounded-md hover:bg-gray-100"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Items */}
                <div className="p-4 overflow-y-auto flex-1">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-8">
                            Your wishlist is empty ❤️
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {items.map((it) => (
                              <li
                                  key={it.id}
                                  className="flex items-center gap-4 p-3 rounded-md border hover:shadow-sm transition"
                              >
                                  <div className="w-20 h-20 shrink-0 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                                      <Image
                                          src={it.img || "/placeholder.png"}
                                          alt={it.name}
                                          width={80}
                                          height={80}
                                          className="object-cover"
                                      />
                                  </div>

                                  <div className="flex-1">
                                      <h4 className="font-medium text-sm">{it.name}</h4>
                                      <p className="text-xs text-gray-500">{it.slug}</p>
                                      <div className="mt-2">
                                          <span className="font-semibold text-sm">
                                              ₹ {it.price.toLocaleString("en-IN")}
                                          </span>
                                      </div>
                                  </div>

                                  <div className="flex flex-col gap-2 items-end">
                                      <button
                                          onClick={() => {
                                              dispatch(addToCart({
                                                  ...it, quantity: 1,
                                                  description: undefined
                                              }));
                                              dispatch(removeFromWishlist(it.id));
                                          }}
                                          className="flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-[#B88E2F] text-white hover:opacity-95"
                                      >
                                          <FiShoppingCart /> Add
                                      </button>

                                      <button
                                          onClick={() => dispatch(removeFromWishlist(it.id))}
                                          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                                          aria-label={`Remove ${it.name}`}
                                      >
                                          <FiTrash2 />
                                      </button>
                                  </div>
                              </li>
                          ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="font-semibold">
                            ₹ {subtotal.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            href="/wishlist"
                            onClick={closeWishlist}
                            className="flex-1 border px-4 py-2 rounded-md text-center hover:bg-gray-50"
                        >
                            View Wishlist
                        </Link>

                        <button
                            onClick={handleAddAllToCart}
                            className="flex-1 bg-[#B88E2F] text-white px-4 py-2 rounded-md hover:opacity-95"
                        >
                            Add All to Cart
                        </button>
                    </div>
                </div>

                {/* Animation */}
                <style jsx>{`
          .animate-slideIn {
            animation: slideIn 240ms ease forwards;
          }
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0%);
            }
          }
        `}</style>
            </aside>
        </>
    );
}
