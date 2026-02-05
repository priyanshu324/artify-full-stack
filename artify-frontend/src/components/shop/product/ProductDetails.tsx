"use client";

import Image from "next/image";
import { useState } from "react";

import ProductTabs from "./ProductTabs";
import type { Product } from "@/src/types/product"; // 👈 use central type

import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import { addToCart } from "@/src/store/redux/zCart/zCartSlice";
import {
    addToWishlist,
    removeFromWishlist,
} from "@/src/store/redux/zWishlist/zWishlistSlice";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const dispatch = useZDispatch();
    const wishlistItems = useZSelector((s) => s.zWishlist.items);

    const [selectedImage, setSelectedImage] = useState<string>(
        product.images?.[0] ?? product.img
    );
    const [quantity, setQuantity] = useState(1);

    const isWishlisted = wishlistItems.some((i) => i.id === product.id);

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12">
                {/* LEFT — Images */}
                <div className="flex gap-6 flex-1">
                    <div className="flex flex-col gap-4">
                        {(product.images ?? [product.img]).map((img, i) => (
                            <div
                              key={i}
                              onClick={() => setSelectedImage(img)}
                              className={`cursor-pointer rounded-md p-1 bg-[#F9F1E7] ${selectedImage === img ? "ring-2 ring-[#B88E2F]" : ""
                                  }`}
                          >
                              <Image
                                  src={img}
                                  alt={product.name}
                                  width={80}
                                  height={80}
                                  className="rounded-md object-cover"
                              />
                          </div>
                      ))}
                    </div>

                    <div className="flex-1 bg-[#F9F1E7] rounded-lg flex items-center justify-center">
                        <Image
                            src={selectedImage}
                            alt={product.name}
                            width={500}
                            height={500}
                            className="rounded-lg object-contain"
                        />
                    </div>
                </div>

                {/* RIGHT — Details */}
                <div className="flex-1">
                    <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">
                        ₹ {product.price.toLocaleString("en-IN")}
                    </p>

                    <p className="text-gray-600 mb-6">{product.description}</p>

                    <div className="flex items-center gap-4 mb-6">
                        {/* Quantity */}
                        <div className="flex items-center border rounded">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-3 py-2"
                            >
                                −
                            </button>
                            <span className="px-4">{quantity}</span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-3 py-2"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={() =>
                                dispatch(addToCart({ ...product, quantity }))
                            }
                            className="px-8 py-3 bg-[#B88E2F] text-white rounded"
                        >
                            Add to Cart
                        </button>

                        {/* Wishlist */}
                        <button
                            onClick={() =>
                                isWishlisted
                                    ? dispatch(removeFromWishlist(product.id))
                                    : dispatch(addToWishlist(product))
                            }
                            className="px-4 py-2 border rounded"
                        >
                            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                        </button>
                    </div>

                    <ProductTabs />
                </div>
            </div>
        </section>
    );
}
