"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FiShare2, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { products } from "@/src/data/products"; // ✅ import centralized data
import { useCartStore } from "@/src/store/cartStore";
import Toast from "../ui/Toast";
import { useWishlistStore } from "@/src/store/wishlistStore";
import WishlistButton from "../ui/WishlistButton";

interface ShopProductsProps {
    filters: {
        layout: "grid" | "list";
        sort: string;
        category: string;
        priceRange: string;
    };
}

const ShopProducts: React.FC<ShopProductsProps> = ({ filters }) => {


    const addToCart = useCartStore((state) => state.addToCart);
    const [added, setAdded] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const router = useRouter();
    const addToWishlist = useWishlistStore((state) => state.addToWishlist);
    const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
    const isInWishlist = useWishlistStore((state) => state.isInWishlist);
    const [wishAdded, setWishAdded] = useState(false);


    // --- Filtering Logic ---
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (filters.category !== "all") {
            result = result.filter(
                (p) => p.category.toLowerCase() === filters.category
            );
        }

        if (filters.priceRange !== "all") {
            result = result.filter((p) => {
                if (filters.priceRange === "low") return p.price < 1000000;
                if (filters.priceRange === "mid")
                    return p.price >= 1000000 && p.price <= 5000000;
                if (filters.priceRange === "high") return p.price > 5000000;
                return true;
            });
        }

        if (filters.sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
        else if (filters.sort === "highToLow")
            result.sort((a, b) => b.price - a.price);

        return result;
    }, [filters]);

    // --- Pagination Logic ---
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage
    );
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // --- Navigation ---
    const handleProductClick = (slug: string) => {
        router.push(`/shop/${slug}`);
    };

    const CheckIcon = () => (
        <svg width="20" height="20" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7"></path>
        </svg>
    );

    const HeartIcon = ({ active }: { active: boolean }) => (
        <svg
            className={`w-5 h-5 transition-all duration-300 ${active
                ? "fill-red-500 stroke-red-500 scale-110"
                : "fill-transparent stroke-gray-600"
                }`}
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path d="M12 21s-6-4.4-10-9.5S2 2 7 2s5 4 5 4 2-4 7-4 5 4 5 9.5S12 21 12 21z" />
        </svg>
    );



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
                    {displayedProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductClick(product.slug)}
                            className="relative group bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
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

                                {/* Tag Badges */}
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
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="flex flex-col justify-center items-center mt-64">
                                        <button
                                            onClick={(e) => {
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    img: product.img,
                                                    slug: product.slug,
                                                    quantity: 1,
                                                });

                                                setAdded(true);
                                                setTimeout(() => setAdded(false), 1200);
                                            }}
                                            className={`bg-white px-6 py-2 font-semibold rounded transition-all ${added ? "bg-green-600 text-white scale-95" : "text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
                                                }`}
                                        >
                                            {added ?
                                                <>
                                                    <CheckIcon /> Added!
                                                </>
                                                : "Add to cart"}
                                        </button>

                                        <WishlistButton
                                            product={{
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                img: product.img,
                                                slug: product.slug,
                                            }}
                                            size="md"
                                        />


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
