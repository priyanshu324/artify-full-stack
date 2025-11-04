"use client";

import React from "react";
import { FiUser, FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const Navbar: React.FC = () => {
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
                    <FiHeart className="w-5 h-5 cursor-pointer hover:text-primary transition" />
                    <FiShoppingCart className="w-5 h-5 cursor-pointer hover:text-primary transition" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
