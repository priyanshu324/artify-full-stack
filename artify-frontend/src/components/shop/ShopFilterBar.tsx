"use client";

import { FiFilter } from "react-icons/fi";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import React from "react";

const ShopFilterBar: React.FC = () => {
    return (
        <div className="bg-[#F9F1E7] py-4 px-6 flex flex-wrap items-center justify-between text-black">
            {/* Left Section - Filter & View */}
            <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <FiFilter className="text-xl" />
                    <span className="font-medium text-base">Filter</span>
                </div>

                {/* View Icons */}
                <div className="flex items-center gap-3 text-xl">
                    <BsGrid3X3Gap className="cursor-pointer hover:text-[#B88E2F]" />
                    <BsListUl className="cursor-pointer hover:text-[#B88E2F]" />
                </div>

                {/* Divider */}
                <div className="h-6 border-l border-gray-400"></div>

                {/* Results Info */}
                <p className="text-sm text-gray-800">
                    Showing <span className="font-semibold">1–16</span> of{" "}
                    <span className="font-semibold">32</span> results
                </p>
            </div>

            {/* Right Section - Show & Sort */}
            <div className="flex items-center gap-3 flex-wrap mt-3 sm:mt-0">
                {/* Show count */}
                <span className="font-medium">Show</span>
                <input
                    type="text"
                    value="16"
                    readOnly
                    className="w-14 text-center border-none bg-white py-1 px-2 text-gray-500"
                />

                {/* Sort by */}
                <span className="font-medium">Sort by</span>
                <select
                    className="bg-white text-gray-400 border-none px-3 py-1 focus:outline-none"
                    defaultValue="Default"
                >
                    <option value="Default">Default</option>
                    <option value="PriceLowHigh">Price: Low to High</option>
                    <option value="PriceHighLow">Price: High to Low</option>
                    <option value="Newest">Newest</option>
                </select>
            </div>
        </div>
    );
};

export default ShopFilterBar;
