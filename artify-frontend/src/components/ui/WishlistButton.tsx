"use client";

import { useState } from "react";
import Toast from "./Toast";

import { useZDispatch, useZSelector } from "@/src/store/redux/hooks";
import {
    addToWishlist,
    removeFromWishlist,
} from "@/src/store/redux/zWishlist/zWishlistSlice";

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

export default function WishlistButton({
    product,
    size = "md",
}: Props) {
    const dispatch = useZDispatch();

    const wishlistItems = useZSelector(
        (state) => state.zWishlist.items
    );

    const isInWishlist = wishlistItems.some(
        (item) => item.id === product.id
    );

    const [addedAnim, setAddedAnim] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const toggleWishlist = () => {
      if (isInWishlist) {
          dispatch(removeFromWishlist(product.id));
          setAddedAnim(false);
    } else {
        dispatch(addToWishlist(product));
        setAddedAnim(true);
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 1500);
  };

    const HeartIcon = ({ active }: { active: boolean }) => (
        <svg
          className={`w-5 h-5 transition-all duration-300 bg-white rounded ${active
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
                  e.stopPropagation();
                  toggleWishlist();
              }}
              className={`
          flex items-center justify-center gap-2 rounded-md border font-medium transition-all bg-white
          ${size === "lg" ? "px-8 py-3 text-base" : "px-4 py-2 text-sm"}
          ${
            isInWishlist
                ? "bg-red-500 text-white border-red-500"
            : "text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
          }
          ${addedAnim ? "scale-95" : ""}
        `}
          >
              <HeartIcon active={isInWishlist} />
              {isInWishlist ? "Wishlisted" : "Add to Wishlist"}
          </button>

          {showToast && (
              <Toast
                  message={
                      isInWishlist
                          ? `${product.name} added to wishlist ❤️`
                          : `${product.name} removed from wishlist`
                  }
              />
          )}
      </>
  );
}
