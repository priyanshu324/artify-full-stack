"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { FiArrowRight } from "react-icons/fi";

// Type definition for each slide
interface InspirationItem {
    img: string;
    title: string;
    subtitle: string;
}

const inspirationsData: InspirationItem[] = [
    { img: "/home/ins/card1.svg", title: "Inner Peace", subtitle: "01 — Bed Room" },
    { img: "/home/ins/card2.svg", title: "Cozy Minimalist", subtitle: "02 — Living Room" },
    { img: "/home/ins/card3.svg", title: "Modern Serenity", subtitle: "03 — Dining Room" },
    { img: "/home/ins/card3.svg", title: "Modern Serenity", subtitle: "03 — Dining Room" },
    { img: "/home/ins/card3.svg", title: "Modern Serenity", subtitle: "03 — Dining Room" },
];

const Inspirations: React.FC = () => {
    return (
        <section className="bg-[#FCF8F3] py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16">
                {/* Left Section */}
                <div className="flex-1 text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#333] leading-snug mb-6">
                        50+ Beautiful rooms inspiration
                    </h2>
                    <p className="text-[#616161] mb-8 leading-relaxed max-w-md">
                        Our designer already made a lot of beautiful prototypes of rooms that inspire you.
                    </p>
                    <button
                        className="bg-[#B88E2F] text-white font-semibold px-6 py-3 hover:bg-[#a27c29] transition-all duration-300"
                        aria-label="Explore more rooms"
                    >
                        Explore More
                    </button>
                </div>

                {/* Right Section (Swiper Carousel) */}
                <div className="flex-1 w-full">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={2}
                        pagination={{ clickable: true }}
                        navigation
                    >
                        {inspirationsData.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative  rounded-2xl overflow-hidden group">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        width={400}
                                        height={580}
                                        className="w-[504px] mx-2 my-2 rounded-2xl h-[670px] object-cover "
                                    />

                                    {/* Overlay Card */}
                                    <div className="absolute bottom-5 left-5 bg-white/95 px-5 py-4 shadow-md rounded-md flex items-center justify-between w-[50%]">
                                        <div>
                                            <p className="text-sm text-gray-500">{item.subtitle}</p>
                                            <h3 className="text-lg font-semibold text-[#3A3A3A]">{item.title}</h3>
                                        </div>
                                        <button
                                            className="bg-[#B88E2F] text-white p-2 rounded-sm hover:bg-[#a27c29] transition-all"
                                            aria-label={`View details for ${item.title}`}
                                        >
                                            <FiArrowRight />
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Inspirations;
