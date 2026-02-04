"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FiShare2, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { products } from "@/src/data/products";
import { useCartStore } from "@/src/store/cartStore";
import Toast from "../ui/Toast";
import { useWishlistStore } from "@/src/store/wishlistStore";
import CompareButton from "../ui/CompareButton";

interface ShopProductsProps {
    filters: {
        layout: "grid" | "list";
        sort: string;
        category: string;
        priceRange: string;
    };
}

const ShopProducts: React.FC<ShopProductsProps> = ({ filters }) => {
    const router = useRouter();

    // Cart Store
    const addToCart = useCartStore((s) => s.addToCart);

    // Wishlist Store
    const addToWishlist = useWishlistStore((s) => s.addToWishlist);
    const removeFromWishlist = useWishlistStore((s) => s.removeFromWishlist);
    const isInWishlist = useWishlistStore((s) => s.isInWishlist);

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [addingIds, setAddingIds] = useState<Record<number, boolean>>({});
    const [wishAnimating, setWishAnimating] = useState<Record<number, boolean>>({});

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    // ---------------- FILTERING ----------------
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (filters.category !== "all") {
            result = result.filter((p) => p.category.toLowerCase() === filters.category);
        }

        if (filters.priceRange !== "all") {
            result = result.filter((p) => {
                if (filters.priceRange === "low") return p.price < 1_000_000;
                if (filters.priceRange === "mid") return p.price >= 1_000_000 && p.price <= 5_000_000;
                if (filters.priceRange === "high") return p.price > 5_000_000;
                return true;
            });
        }

        if (filters.sort === "lowToHigh") result.sort((a, b) => a.price - b.price);
        else if (filters.sort === "highToLow") result.sort((a, b) => b.price - a.price);

        return result;
    }, [filters]);

    // ---------------- PAGINATION ----------------
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // ---------------- NAVIGATION ----------------
    const handleProductClick = (slug: string) => {
        router.push(`/shop/${slug}`);
    };

    // Check icon for "Added!"
    const CheckIcon = () => (
        <svg width="16" height="16" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7"></path>
        </svg>
    );

    const HeartIcon = ({ active }: { active: boolean }) => (
        <>
            <svg className={`w-4 h-4 transition-all duration-300 ${active ? "fill-red-500 stroke-red-500 scale-110" : "fill-transparent stroke-gray-600"}`} strokeWidth="2" viewBox="0 0 24 24" >
                <path d="M12 21s-6-4.4-10-9.5S2 2 7 2s5 4 5 4 2-4 7-4 5 4 5 9.5S12 21 12 21z" />
            </svg>
        </>

    );

    // ---------------- ADD TO CART ----------------
    const handleAddToCart = (e: React.MouseEvent, product: typeof products[number]) => {
        e.stopPropagation();

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            slug: product.slug,
            quantity: 1,
        });

        setAddingIds((s) => ({ ...s, [product.id]: true }));
        setToastMessage(`${product.name} added to cart`);

        setTimeout(() => {
            setAddingIds((s) => ({ ...s, [product.id]: false }));
            setToastMessage(null);
        }, 1400);
    };

    // ---------------- WISHLIST TOGGLE ----------------
    const handleToggleWishlist = (e: React.MouseEvent, product: typeof products[number]) => {
        e.stopPropagation();

        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
            setToastMessage(`${product.name} removed from wishlist`);
        } else {
            addToWishlist(product);
            setToastMessage(`${product.name} added to wishlist`);
        }

        setWishAnimating((s) => ({ ...s, [product.id]: true }));
        setTimeout(() => setWishAnimating((s) => ({ ...s, [product.id]: false })), 700);
        setTimeout(() => setToastMessage(null), 1300);
    };

    // ---------------- SHARE HANDLER (FIXED) ----------------
    const handleShare = async (e: React.MouseEvent, product: typeof products[number]) => {
        e.stopPropagation();

        const url = `${window.location.origin}/shop/${product.slug}`;

        const shareData = {
            title: product.name,
            text: product.description,
            url,
        };

        // Mobile share API
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                setToastMessage("Share cancelled");
            }
            setTimeout(() => setToastMessage(null), 1400);
            return;
        }

        // Clipboard fallback
        try {
            await navigator.clipboard.writeText(url);
            setToastMessage("Link copied to clipboard");
        } catch {
            setToastMessage("Copy failed");
        }

        setTimeout(() => setToastMessage(null), 1400);
    };

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
                            className="relative group bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
                        >
                            {/* Product Image */}
                            <div className="relative overflow-hidden">
                                <Image
                                    src={product.img}
                                    alt={product.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Tag Badges */}
                                {product.tag === "discount" && (
                                    <span className="absolute top-3 right-3 bg-[#E97171] text-white px-3 py-1 text-xs rounded-full">
                                        {product.discount}
                                    </span>
                                )}

                                {product.tag === "new" && (
                                    <span className="absolute top-3 right-3 bg-[#2EC1AC] text-white px-3 py-1 text-xs rounded-full">
                                        New
                                    </span>
                                )}

                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="flex flex-col justify-center items-center mt-64 gap-3">

                                        {/* Add to Cart */}
                                        <button
                                            onClick={(e) => handleAddToCart(e, product)}
                                            className={`
                                                px-6 py-2 font-semibold rounded flex items-center gap-1 cursor-pointer
                                                ${addingIds[product.id]
                                                    ? "bg-green-600 text-white scale-95"
                                                    : "bg-white text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white"
                                                }
                                            `}
                                        >
                                            {addingIds[product.id] ? <CheckIcon /> : "Add to cart"}
                                        </button>

                                        {/* Share | Compare | Wishlist */}
                                        <div className="flex items-center gap-3 text-white">

                                            {/* Share */}
                                            <div
                                                onClick={(e) => handleShare(e, product)}
                                                className="cursor-pointer p-2 bg-white rounded-full hover:scale-110 transition"
                                            >
                                                <FiShare2 className="text-gray-800" />
                                            </div>

                                            {/* Compare */}
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setToastMessage("Compare feature coming soon");
                                                    setTimeout(() => setToastMessage(null), 1200);
                                                }}
                                                className="cursor-pointer p-2 bg-white rounded-full hover:scale-110 transition"
                                            >
                                                <FiShoppingCart className="text-gray-800" />
                                            </div>

                                            {/* Wishlist */}
                                            <div
                                                onClick={(e) => handleToggleWishlist(e, product)}
                                                className="cursor-pointer p-2 bg-white rounded-full hover:scale-110 transition"
                                            >
                                                <HeartIcon
                                                    active={
                                                        isInWishlist(product.id) ||
                                                        wishAnimating[product.id]
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-4 text-left">
                                <h3 className="text-lg font-semibold text-[#3A3A3A]">{product.name}</h3>
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
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-md cursor-pointer ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-[#B88E2F] hover:text-white"
                            }`}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-4 py-2 border rounded-md cursor-pointer ${currentPage === i + 1
                                ? "bg-[#B88E2F] text-white"
                                : "bg-gray-100 hover:bg-[#B88E2F] hover:text-white"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded-md cursor-pointer ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-[#B88E2F] hover:text-white"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Toast */}
            {toastMessage && <Toast message={toastMessage} />}
        </section>
    );
};

export default ShopProducts;
