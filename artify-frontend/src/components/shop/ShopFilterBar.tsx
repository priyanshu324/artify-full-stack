"use client";

import { FiFilter } from "react-icons/fi";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import React, { useState } from "react";

interface FilterProps {
    onFilterChange: (filters: {
        layout: "grid" | "list";
        sort: string;
        category: string;
        priceRange: string;
    }) => void;
    currentPage: number;
    productsPerPage: number;
    totalProducts: number;
}

const ShopFilterBar: React.FC<FilterProps> = ({
    onFilterChange,
    currentPage,
    productsPerPage,
    totalProducts,
}) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const [sort, setSort] = useState("default");
    const [category, setCategory] = useState("all");
    const [priceRange, setPriceRange] = useState("all");

    const handleChange = (updates: any) => {
        const newFilters = { layout, sort, category, priceRange, ...updates };
        if (updates.layout) setLayout(updates.layout);
        if (updates.sort) setSort(updates.sort);
        if (updates.category) setCategory(updates.category);
        if (updates.priceRange) setPriceRange(updates.priceRange);
        onFilterChange(newFilters);
    };

    // 🧮 Pagination Range Calculation
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, totalProducts);

    return (
        <div className="bg-[#F9F1E7] py-4 px-6 flex flex-wrap items-center justify-between text-black">
          {/* Left Section */}
          <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                  <FiFilter className="text-xl" />
                  <span className="font-medium text-base">Filter</span>
              </div>

              <div className="flex items-center gap-3 text-xl">
                  <BsGrid3X3Gap
                      className={`cursor-pointer ${layout === "grid" ? "text-[#B88E2F]" : "text-black"
                          }`}
                      onClick={() => handleChange({ layout: "grid" })}
                  />
                  <BsListUl
                      className={`cursor-pointer ${layout === "list" ? "text-[#B88E2F]" : "text-black"
                          }`}
                      onClick={() => handleChange({ layout: "list" })}
                  />
              </div>

              <div className="h-6 border-l border-gray-400"></div>

              {/* Dynamic Pagination Info */}
              <p className="text-sm text-gray-800">
                  Showing{" "}
                  <span className="font-semibold">{startIndex}</span>–
                  <span className="font-semibold">{endIndex}</span> of{" "}
                  <span className="font-semibold">{totalProducts}</span> results
              </p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 flex-wrap mt-3 sm:mt-0">
              {/* Category Filter */}
              <div className="flex gap-2 items-center">
                  <label className="font-medium">Category:</label>
                  <select
                      className="bg-white text-gray-600 px-2 py-1 rounded-md"
                      value={category}
                      onChange={(e) => handleChange({ category: e.target.value })}
                  >
                      <option value="all">All</option>
                      <option value="chair">Chair</option>
                      <option value="sofa">Sofa</option>
                      <option value="outdoor">Outdoor</option>
                  </select>
              </div>

              {/* Price Filter */}
              <div className="flex gap-2 items-center">
                  <label className="font-medium">Price:</label>
                  <select
                      className="bg-white text-gray-600 px-2 py-1 rounded-md"
                      value={priceRange}
                      onChange={(e) => handleChange({ priceRange: e.target.value })}
                  >
                      <option value="all">All</option>
                      <option value="low">Under Rp 1.000.000</option>
                      <option value="mid">Rp 1.000.000 - Rp 5.000.000</option>
                      <option value="high">Above Rp 5.000.000</option>
                  </select>
              </div>

              {/* Sort By */}
              <div className="flex gap-2 items-center">
                  <label className="font-medium">Sort by:</label>
                  <select
                      className="bg-white text-gray-600 px-3 py-1 rounded-md"
                      value={sort}
                      onChange={(e) => handleChange({ sort: e.target.value })}
                  >
                      <option value="default">Default</option>
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                      <option value="newest">Newest</option>
                  </select>
              </div>
          </div>
      </div>
  );
};

export default ShopFilterBar;
