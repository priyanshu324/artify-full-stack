"use client";

import { useWishlistStore } from "@/src/store/wishlistStore";
import Toast from "./Toast";
import { useState } from "react";

interface Props {
    product: {
        id: number;
        name: string;
        price: number;
        img: string;
        slug: string;
    };
    size?: "md" | "lg"; // md = shop grid, lg = product page
}

export default function WishlistButton({ product, size = "md" }: Props) {
    const addToWishlist = useWishlistStore((s) => s.addToWishlist);
    const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
    const isInWishlist = useWishlistStore((s) => s.isInWishlist);

    const [addedAnim, setAddedAnim] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const toggleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            setAddedAnim(false);
            setShowToast(true);
        } else {
            addToWishlist(product);
            setAddedAnim(true);
            setShowToast(true);
        }
    };
    const HeartIcon = ({ active }: { active: boolean }) => (
        <svg
            className={`w-5 h-5 transition-all duration-300 ${active
                ? "fill-red-500 stroke-red-500 scale-110"
                : "fill-transparent stroke-gray-600"
                }`}
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path d="M12 21s-6-4.4-10-9.5S2 2 7 2s5 4 5 4 2-4 7-4 5 4 5 9.5S12 21 12 21z" />
        </svg>
    );


    return (
        <>
            <button
                onClick={(e) => {
                    toggleWishlist();
                }}
                className={`
          flex items-center justify-center gap-2 rounded-md border font-medium transition-all
          ${size === "lg" ? "px-8 py-3 text-base" : "px-4 py-2 text-sm"}
          ${isInWishlist(product.id)
                        ? "bg-red-500 text-white border-red-500"
                        : "border-gray-400 text-gray-700 hover:bg-gray-100"}
          ${addedAnim ? "scale-95" : ""}
        `}
            >
                <HeartIcon active={isInWishlist(product.id)} />
                {isInWishlist(product.id) ? "Wishlisted" : "Add to Wishlist"}
            </button>

            {showToast && (
                <Toast
                    message={
                        isInWishlist(product.id)
                            ? `${product.name} added to wishlist ❤️`
                            : `${product.name} removed from wishlist`
                    }
                />
            )}
        </>
    );
}
