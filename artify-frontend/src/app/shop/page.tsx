"use client";

import { useState } from "react";
import ShopBanner from "@/src/components/shop/ShopBanner";
import ShopFilterBar from "@/src/components/shop/ShopFilterBar";
import ShopProducts from "@/src/components/shop/ShopProducts";
import ShopFeatures from "@/src/components/shop/ShopFeatures";

export default function ShopPage() {
  const [filters, setFilters] = useState({
    layout: "grid" as "grid" | "list",
    sort: "default",
    category: "all",
    priceRange: "all",
  });

  // 🔢 Pass pagination details to Filter Bar
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalProducts = 32; // replace with your actual product count from DB

  return (
    <div>
      <ShopBanner />
      <ShopFilterBar
        onFilterChange={setFilters}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={totalProducts}
      />
      <ShopProducts filters={filters} />
      <ShopFeatures />
    </div>
  );
}
