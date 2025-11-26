"use client";

import React, { useEffect, useState } from "react";
import { FiUser, FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/src/store/cartStore";
import { useWishlistStore } from "@/src/store/wishlistStore";
import IconButton from "../ui/IconButton";
import { useUIStore } from "@/src/store/uiStore";

const Navbar: React.FC = () => {

    const openWishlist = useUIStore((s) => s.openWishlist);
    const openCart = useUIStore((s) => s.openCart);
    const totalCartItems = useCartStore((s) => s.items.reduce((a, b) => a + b.quantity, 0));
    const totalWishlist = useWishlistStore((s) => s.items.length);
    // Animations
    const [animateBadge, setAnimateBadge] = useState(false);
    const [animateCart, setAnimateCart] = useState(false);

    // Reactive selector: recalculates whenever `items` changes
    const totalItems = useCartStore((state) =>
        state.items.reduce((acc, it) => acc + it.quantity, 0)
    );


    useEffect(() => {
        if (totalItems > 0) {
            setAnimateBadge(true);
            setAnimateCart(true);

            const timeout1 = setTimeout(() => setAnimateBadge(false), 400);
            const timeout2 = setTimeout(() => setAnimateCart(false), 500);

            return () => {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
            };
        }
    }, [totalItems]);

    return (
        <header className="w-full shadow-sm bg-white fixed z-50">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/logo.svg"
                        alt="ArtMart Logo"
                        width={30}
                        height={30}
                        className="object-contain"
                    />
                    <span className="text-xl font-semibold text-gray-800">ArtMart</span>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
                    <Link href="/" className="hover:text-primary transition">Home</Link>
                    <Link href="/shop" className="hover:text-primary transition">Shop</Link>
                    <Link href="/about" className="hover:text-primary transition">About</Link>
                    <Link href="/contact" className="hover:text-primary transition">Contact</Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-6 text-gray-700">
                    <FiUser className="w-5 h-5 cursor-pointer hover:text-primary transition" />
                    <FiSearch className="w-5 h-5 cursor-pointer hover:text-primary transition" />

                    <IconButton ariaLabel="Open wishlist" onClick={() => openWishlist()}>
                        <div className="relative">
                            <FiHeart className="text-gray-800" />
                            {totalWishlist > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">{totalWishlist}</span>}
                        </div>
                    </IconButton>

                    <IconButton ariaLabel="Open cart" onClick={() => openCart()}>
                        <div className="relative">
                            <FiShoppingCart className="text-gray-800" />
                            {totalCartItems > 0 && <span className="absolute -top-2 -right-2 bg-[#B88E2F] text-white text-xs px-1 rounded-full">{totalCartItems}</span>}
                        </div>
                    </IconButton>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
