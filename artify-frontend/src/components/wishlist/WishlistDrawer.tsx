"use client";

import Image from "next/image";
import { FiX, FiTrash2, FiShoppingCart } from "react-icons/fi";

import { useZUiStore } from "@/src/store/zUiStore";
import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import { removeFromWishlist, clearWishlist } from "@/src/store/redux/zWishlist/zWishlistSlice";
import { addToCart } from "@/src/store/redux/zCart/zCartSlice";

export default function WishlistDrawer() {
    const { isWishlistOpen, closeWishlist } = useZUiStore();

    const dispatch = useZDispatch();
    const items = useZSelector(state => state.zWishlist.items);

    if (!isWishlistOpen) return null;

    const subtotal = items.reduce((acc, it) => acc + it.price, 0);

    return (
        <>
            <div
                onClick={closeWishlist}
                className="fixed inset-0 bg-black/40 z-60"
            />

            <aside className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-70 shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="text-lg font-semibold">My Wishlist</h3>
                    <button onClick={closeWishlist} className="p-2 hover:bg-gray-100 rounded">
                        <FiX />
                    </button>
                </div>

                {/* Items */}
                <div className="p-4 overflow-y-auto h-[calc(100%-200px)]">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-500 mt-10">
                            Wishlist is empty ❤️
                        </div>
                    ) : (
                        <ul className="space-y-4">
                                {items.map(item => (
                                    <li key={item.id} className="flex gap-4 border p-3 rounded">
                                        <Image
                                          src={item.img}
                                          alt={item.name}
                                          width={80}
                                          height={80}
                                          className="rounded object-cover"
                                      />

                                      <div className="flex-1">
                                          <div className="font-medium text-sm">{item.name}</div>
                                          <div className="text-sm text-gray-500">
                                              Rs. {item.price.toLocaleString("en-IN")}
                                          </div>

                                          <div className="mt-2 flex gap-2">
                                              <button
                                                  onClick={() => {
                                                      dispatch(addToCart({ ...item, quantity: 1 }));
                                                      dispatch(removeFromWishlist(item.id));
                                                  }}
                                                  className="flex items-center gap-2 text-xs px-3 py-1 bg-[#B88E2F] text-white rounded"
                                              >
                                                  <FiShoppingCart /> Add to Cart
                                              </button>

                                              <button
                                                  onClick={() => dispatch(removeFromWishlist(item.id))}
                                                  className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                                              >
                                                  <FiTrash2 />
                                              </button>
                                          </div>
                                      </div>
                                  </li>
                              ))}
                        </ul>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t">
                    <div className="flex justify-between mb-4 text-sm">
                        <span>Subtotal</span>
                        <span className="font-semibold">
                            Rs. {subtotal.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={closeWishlist}
                            className="flex-1 border py-2 rounded"
                        >
                            View Wishlist
                        </button>

                        <button
                            onClick={() => {
                                items.forEach(it =>
                                    dispatch(addToCart({ ...it, quantity: 1 }))
                                );
                                dispatch(clearWishlist());
                                closeWishlist();
                            }}
                            className="flex-1 bg-[#B88E2F] text-white py-2 rounded"
                        >
                            Add All to Cart
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
