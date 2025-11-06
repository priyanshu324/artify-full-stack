"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FiShare2, FiHeart, FiShoppingCart } from "react-icons/fi";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    tag?: "new" | "discount";
    discount?: string;
    img: string;
    category: string;
}

interface ShopProductsProps {
    filters: {
        layout: "grid" | "list";
        sort: string;
        category: string;
        priceRange: string;
    };
}

const productsData: Product[] = [
    {
        id: 1,
        name: "Syltherine",
        description: "Stylish cafe chair",
        price: 2500000,
        oldPrice: 3500000,
        tag: "discount",
        discount: "-30%",
        category: "chair",
        img: "/home/products/product1.svg",
    },
    {
        id: 2,
        name: "Leviosa",
        description: "Stylish cafe chair",
        price: 2500000,
        category: "chair",
        img: "/home/products/product1.svg",
    },
    {
        id: 3,
        name: "Lolito",
        description: "Luxury big sofa",
        price: 7000000,
        oldPrice: 14000000,
        tag: "discount",
        discount: "-50%",
        category: "sofa",
        img: "/home/products/product1.svg",
    },
    {
        id: 4,
        name: "Respira",
        description: "Outdoor bar table and stool",
        price: 500000,
        tag: "new",
        category: "outdoor",
        img: "/home/products/product1.svg",
    },
    ...Array(8).fill({
        id: 5,
        name: "Syltherine",
        description: "Stylish cafe chair",
        price: 2500000,
        oldPrice: 3500000,
        tag: "discount",
        discount: "-30%",
        category: "chair",
        img: "/home/products/product1.svg",
    }), ...Array(8).fill({
        id: 5,
        name: "Syltherine",
        description: "Stylish cafe chair",
        price: 2500000,
        oldPrice: 3500000,
        tag: "discount",
        discount: "-30%",
        category: "chair",
        img: "/home/products/product1.svg",
    }),
];

const ShopProducts: React.FC<ShopProductsProps> = ({ filters }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // --- Filter Logic ---
    const filteredProducts = useMemo(() => {
        let result = [...productsData];

        // Category filter
        if (filters.category !== "all") {
            result = result.filter(
                (product) => product.category.toLowerCase() === filters.category
            );
        }

        // Price range filter
        if (filters.priceRange !== "all") {
            result = result.filter((product) => {
                if (filters.priceRange === "low") return product.price < 1000000;
                if (filters.priceRange === "mid")
                    return product.price >= 1000000 && product.price <= 5000000;
                if (filters.priceRange === "high") return product.price > 5000000;
                return true;
            });
        }

        // Sorting
        if (filters.sort === "lowToHigh")
            result.sort((a, b) => a.price - b.price);
        else if (filters.sort === "highToLow")
            result.sort((a, b) => b.price - a.price);

        return result;
    }, [filters]);

    // --- Pagination ---
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Product Grid */}
                <div
                    className={`grid ${filters.layout === "grid"
                        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                        : "grid-cols-1"
                        } gap-6`}
                >
                    {displayedProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="relative group bg-white shadow-sm transition-all hover:shadow-md"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <Image
                                    src={product.img}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Discount/New Badge */}
                                {product.tag === "discount" && (
                                    <span className="absolute top-3 right-3 bg-[#E97171] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        {product.discount}
                                    </span>
                                )}
                                {product.tag === "new" && (
                                    <span className="absolute top-3 right-3 bg-[#2EC1AC] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                        New
                                    </span>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-all duration-300">
                                    <button className="bg-white text-[#B88E2F] font-semibold px-6 py-2 mb-4 hover:bg-[#B88E2F] hover:text-white transition-all">
                                        Add to cart
                                    </button>
                                    <div className="flex gap-6 text-white text-sm">
                                        <button className="flex items-center gap-1 hover:text-[#B88E2F]">
                                            <FiShare2 /> Share
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-[#B88E2F]">
                                            <FiShoppingCart /> Compare
                                        </button>
                                        <button className="flex items-center gap-1 hover:text-[#B88E2F]">
                                            <FiHeart /> Like
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4 text-left">
                                <h3 className="text-lg font-semibold text-[#3A3A3A]">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">{product.description}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="font-bold text-[#3A3A3A]">
                                        Rp {product.price.toLocaleString("id-ID")}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            Rp {product.oldPrice.toLocaleString("id-ID")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-3 mt-10">
                    {/* Previous Button */}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border border-gray-300 rounded-md transition-all ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-[#B88E2F] hover:text-white"
                            }`}
                    >
                        Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 rounded-md border border-gray-300 ${currentPage === i + 1
                                ? "bg-[#B88E2F] text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-[#B88E2F] hover:text-white"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() =>
                            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border border-gray-300 rounded-md transition-all ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-[#B88E2F] hover:text-white"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ShopProducts;
