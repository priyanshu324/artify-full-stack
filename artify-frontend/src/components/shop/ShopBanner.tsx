"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const ShopBanner: React.FC = () => {
    return (
        <section className="relative w-full h-[316px]">
            {/* Background Image */}
            <Image
                src="/shop/banner.svg" // 🖼️ Replace with your correct banner image path
                alt="Shop Banner"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold text-black mb-3">Shop</h1>
                <div className="flex items-center justify-center gap-2 text-gray-700 text-sm">
                    <Link href="/" className="text-black font-semibold hover:text-[#B88E2F] transition-all">
                        Home
                    </Link>
                    <FiChevronRight className="text-black w-4 h-4" />
                    <span className="text-gray-700">Shop</span>
                </div>
            </div>
        </section>
    );
};

export default ShopBanner;