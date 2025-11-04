"use client";

import React from "react";
import Image from "next/image";
import { FaRegHeart, FaShareAlt, FaBalanceScale } from "react-icons/fa";

interface Product {
    id: number;
    title: string;
    description: string;
    price: string;
    oldPrice?: string;
    image: string;
    tag?: string;
}

const products: Product[] = [
    {
        id: 1,
        title: "Syltherine",
        description: "Stylish cafe chair",
        price: "Rp 2.500.000",
        oldPrice: "Rp 3.500.000",
        image: "/home/products/product1.svg",
        tag: "-30%",
    },
    {
        id: 2,
        title: "Leviosa",
        description: "Stylish cafe chair",
        price: "Rp 2.500.000",
        image: "/home/products/product2.svg",
    },
    {
        id: 3,
        title: "Lolito",
        description: "Luxury big sofa",
        price: "Rp 7.000.000",
        oldPrice: "Rp 14.000.000",
        image: "/home/products/product3.svg",
        tag: "-50%",
    },
    {
        id: 4,
        title: "Respira",
        description: "Outdoor bar table and stool",
        price: "Rp 500.000",
        image: "/home/products/product4.svg",
        tag: "New",
    },
    {
        id: 5,
        title: "Grifo",
        description: "Night lamp",
        price: "Rp 1.500.000",
        image: "/home/products/product4.svg",
    },

];

const Products: React.FC = () => {
    return (
        <section className="py-16 text-center bg-white">
            {/* Title */}
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h2>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-20">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="relative group bg-gray-50 rounded-md overflow-hidden shadow-sm"
                    >
                        {/* Product Image */}
                        <div className="relative w-full h-[350px]">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover transition-transform duration-300 "
                            />

                            {/* Tag Badge */}
                            {product.tag && (
                                <span
                                    className={`absolute top-4 right-4 text-white text-sm font-semibold px-3 py-1 rounded-full ${product.tag === "New"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                        }`}
                                >
                                    {product.tag}
                                </span>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="bg-yellow-600 text-white px-6 py-2 font-medium rounded-md hover:bg-yellow-700 transition">
                                    Add to cart
                                </button>
                                <div className="flex gap-4 mt-3 text-white text-sm">
                                    <button className="flex items-center gap-1 hover:text-yellow-400">
                                        <FaShareAlt /> Share
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-yellow-400">
                                        <FaBalanceScale /> Compare
                                    </button>
                                    <button className="flex items-center gap-1 hover:text-yellow-400">
                                        <FaRegHeart /> Like
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="text-left p-4">
                            <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-900 font-bold">{product.price}</span>
                                {product.oldPrice && (
                                    <span className="text-gray-400 line-through text-sm">
                                        {product.oldPrice}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            <div className="mt-12">
                <button className="bg-yellow-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-yellow-700 transition">
                    Show More
                </button>
            </div>
        </section>
    );
};

export default Products;
