"use client";

import React from "react";
import { FaTrophy, FaShippingFast, FaHeadset } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const features = [
    {
        icon: <FaTrophy className="text-4xl text-[#B88E2F]" />,
        title: "High Quality",
        desc: "crafted from top materials",
    },
    {
        icon: <MdVerified className="text-4xl text-[#B88E2F]" />,
        title: "Warranty Protection",
        desc: "Over 2 years",
    },
    {
        icon: <FaShippingFast className="text-4xl text-[#B88E2F]" />,
        title: "Free Shipping",
        desc: "Order over 150 $",
    },
    {
        icon: <FaHeadset className="text-4xl text-[#B88E2F]" />,
        title: "24 / 7 Support",
        desc: "Dedicated support",
    },
];

const ShopFeatures: React.FC = () => {
    return (
        <section className="bg-[#F9F1E7] py-10 mt-10">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-8 text-center sm:text-left">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <div>{item.icon}</div>
                        <div>
                            <h3 className="text-lg font-semibold text-black">
                                {item.title}
                            </h3>
                            <p className="text-gray-500 text-sm">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopFeatures;