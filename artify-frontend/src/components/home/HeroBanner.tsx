"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

const HeroBanner: React.FC = () => {
    return (
        <section className="relative w-full h-[716px]">
            {/* Background Image (Covers Entire Width) */}
            <div className="absolute inset-0">
                <Image
                    src="/home/hero-banner.svg"
                    alt="ArtMart Hero Banner"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Overlay for Right Side Card */}
            <div className="absolute right-24 top-1/2 -translate-y-1/2 bg-[#FFF3E3] p-10 rounded-lg shadow-lg max-w-md w-[640px]">
                <p className="uppercase text-gray-600 text-sm tracking-widest mb-2">
                    New Arrival
                </p>
                <h1 className="text-5xl font-bold text-[#B88E2F] leading-tight mb-4">
                    Discover Our <br /> New Collection
                </h1>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                    tellus, luctus nec ullamcorper mattis.
                </p>
                <button className="bg-[#B88E2F] hover:bg-[#a17b27] text-white font-semibold px-8 py-3 flex items-center gap-2 rounded transition-all duration-300">
                    BUY NOW <FaArrowRight />
                </button>
            </div>
        </section>
    );
};

export default HeroBanner;
