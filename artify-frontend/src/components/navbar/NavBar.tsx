"use client";

import React, { useEffect, useState } from "react";
import { FiUser, FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

import IconButton from "../ui/IconButton";
import { useZUiStore } from "@/src/store/zUiStore";

import { useZSelector } from "@/src/store/redux/hooks";

const Navbar: React.FC = () => {
    /* ---------- UI DRAWERS ---------- */
    const openWishlist = useZUiStore((s) => s.openWishlist);
    const openCart = useZUiStore((s) => s.openCart);

    /* ---------- REDUX STATE ---------- */
    const cartItems = useZSelector((s) => s.zCart.items);
    const wishlistItems = useZSelector((s) => s.zWishlist.items);

    const totalCartItems = cartItems.reduce(
        (acc, it) => acc + it.quantity,
        0
    );
    const totalWishlistItems = wishlistItems.length;

    /* ---------- ANIMATIONS ---------- */
    const [animateBadge, setAnimateBadge] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);

    useEffect(() => {
        if (totalCartItems > 0) {
            setAnimateBadge(true);
            setAnimateCart(true);

          const t1 = setTimeout(() => setAnimateBadge(false), 400);
          const t2 = setTimeout(() => setAnimateCart(false), 500);

          return () => {
              clearTimeout(t1);
              clearTimeout(t2);
          };
      }
    }, [totalCartItems]);

    return (
        <header className="w-full shadow-sm bg-white fixed z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/logo.svg"
                        alt="Artify Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    <span className="text-xl font-semibold text-gray-800">
                        Artify
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
                    <Link href="/" className="hover:text-primary transition">
                        Home
                    </Link>
                    <Link href="/shop" className="hover:text-primary transition">
                        Shop
                    </Link>
                    <Link href="/about" className="hover:text-primary transition">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-primary transition">
                        Contact
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-6 text-gray-700">
                    <FiUser className="w-5 h-5 cursor-pointer hover:text-primary transition" />
                    <FiSearch className="w-5 h-5 cursor-pointer hover:text-primary transition" />

                    {/* Wishlist */}
                    <IconButton ariaLabel="Open wishlist" onClick={openWishlist}>
                        <div className="relative">
                            <FiHeart className="text-gray-800" />
                            {totalWishlistItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                                    {totalWishlistItems}
                                </span>
                            )}
                        </div>
                    </IconButton>

                    {/* Cart */}
                    <IconButton ariaLabel="Open cart" onClick={openCart}>
                        <div className="relative">
                            <FiShoppingCart
                                className={`text-gray-800 ${animateCart ? "scale-110 transition" : ""
                                    }`}
                            />
                            {totalCartItems > 0 && (
                                <span
                                    className={`absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs px-1 rounded-full ${animateBadge ? "animate-pingOnce" : ""
                                        }`}
                                >
                                    {totalCartItems}
                                </span>
                            )}
                        </div>
                    </IconButton>
                </div>
            </div>

            {/* badge animation */}
            <style jsx>{`
        .animate-pingOnce {
          animation: pingOnce 0.4s ease-out;
        }
        @keyframes pingOnce {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.3);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
        </header>
    );
};

export default Navbar;
