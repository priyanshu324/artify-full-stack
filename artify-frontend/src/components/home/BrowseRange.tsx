"use client";

import React from "react";
import Image from "next/image";

interface Category {
    title: string;
    image: string;
}

const categories: Category[] = [
    { title: "Dining", image: "/home/card-1.svg" },
    { title: "Living", image: "/home/card-2.svg" },
    { title: "Bedroom", image: "/home/card-3.svg" },
];

const BrowseRange: React.FC = () => {
    return (
        <section className="py-16 text-center">
            {/* Heading */}
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Browse The Range</h2>
                <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>

            {/* Category Grid */}
            <div className="flex flex-wrap justify-center gap-6 px-4 md:px-20">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center transition-transform duration-300 hover:scale-105"
                    >
                        <div className="w-[350px] h-[400px] relative rounded-lg overflow-hidden shadow-sm">
                            <Image
                                src={cat.image}
                                alt={cat.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="text-lg font-semibold mt-4 text-gray-800">
                            {cat.title}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrowseRange;
