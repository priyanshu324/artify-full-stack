"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiShare2, FiHeart, FiShoppingCart } from "react-icons/fi";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    oldPrice?: string;
    tag?: "new" | "discount";
    discount?: string;
    img: string;
}

const productsData: Product[] = [
    {
        id: 1,
        name: "Syltherine",
        description: "Stylish cafe chair",
        price: "Rp 2.500.000",
        oldPrice: "Rp 3.500.000",
        tag: "discount",
        discount: "-30%",
        img: "/home/products/product1.svg",
    },
    {
        id: 2,
        name: "Leviosa",
        description: "Stylish cafe chair",
        price: "Rp 2.500.000",
        img: "/home/products/product1.svg",
    },
    {
        id: 3,
        name: "Lolito",
        description: "Luxury big sofa",
        price: "Rp 7.000.000",
        oldPrice: "Rp 14.000.000",
        tag: "discount",
        discount: "-50%",
        img: "/home/products/product1.svg",
    },
    {
        id: 4,
        name: "Respira",
        description: "Outdoor bar table and stool",
        price: "Rp 500.000",
        tag: "new",
        img: "/home/products/product1.svg",
    },
    // duplicate to fill pagination
    ...Array(8).fill({
        id: 5,
        name: "Syltherine",
        description: "Stylish cafe chair",
        price: "Rp 2.500.000",
        oldPrice: "Rp 3.500.000",
        tag: "discount",
        discount: "-30%",
        img: "/home/products/product1.svg",
    }),
    ...Array(8).fill({
        id: 6,
        name: "Syltherine",
        description: "Stylish cafe chair",
        price: "Rp 2.500.000",
        oldPrice: "Rp 3.500.000",
        tag: "discount",
        discount: "-30%",
        img: "/home/products/product1.svg",
    }),
];

const ShopProducts: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = productsData.slice(
        startIndex,
        startIndex + productsPerPage
    );
    const totalPages = Math.ceil(productsData.length / productsPerPage);

    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                                        {product.price}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-sm text-gray-400 line-through">
                                            {product.oldPrice}
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
