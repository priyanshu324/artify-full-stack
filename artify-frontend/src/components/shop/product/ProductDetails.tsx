"use client";

import Image from "next/image";
import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useParams } from "next/navigation";
import { products } from "@/src/data/products";
import { useCartStore } from "@/src/store/cartStore";
import Toast from "../../ui/Toast";
import { useWishlistStore } from "@/src/store/wishlistStore";
import WishlistButton from "../../ui/WishlistButton";

const ProductDetails = () => {
    const { slug } = useParams(); // Get dynamic route param
    const product = products.find((p) => p.slug === slug); // Find the right product
    const addToCart = useCartStore((state) => state.addToCart);
    const [added, setAdded] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const addToWishlist = useWishlistStore((state) => state.addToWishlist);
    const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
    const isInWishlist = useWishlistStore((state) => state.isInWishlist);
    const [wishAdded, setWishAdded] = useState(false);


    if (!product) {
        return (
            <div className="py-16 text-center text-gray-600 text-lg">
                Product not found 😢
            </div>
        );
    }

    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

    const handleQuantity = (type: "increase" | "decrease") => {
        if (type === "increase") setQuantity((prev) => prev + 1);
        if (type === "decrease" && quantity > 1) setQuantity((prev) => prev - 1);
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
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12">
                {/* Left Images Section */}
                <div className="flex gap-6 flex-1">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-4">
                        {product.images.map((img, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer rounded-md p-1 bg-[#F9F1E7] hover:opacity-80 ${selectedImage === img ? "ring-2 ring-[#B88E2F]" : ""
                                    }`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 bg-[#F9F1E7] rounded-lg flex items-center justify-center">
                        <Image
                            src={selectedImage}
                            alt={`${product.name} main`}
                            width={500}
                            height={500}
                            className="rounded-lg object-contain"
                        />
                    </div>
                </div>

                {/* Right Info Section */}
                <div className="flex-1">
                    <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>
                    <p className="text-gray-500 text-lg mb-2">
                        Rs. {product.price.toLocaleString("en-IN")}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex text-[#FFC700] text-xl">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={i < product.rating ? "text-[#FFC700]" : "text-gray-300"}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-sm text-gray-400 ml-2">
                            {product.reviews} Customer Review
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Size */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Size</h4>
                        <div className="flex gap-3">
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border rounded-md ${selectedSize === size
                                        ? "bg-[#B88E2F] text-white border-[#B88E2F]"
                                        : "border-gray-300 text-gray-600 hover:border-[#B88E2F]"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Color</h4>
                        <div className="flex gap-3">
                            {product.colors.map(({ name, code }) => (
                                <button
                                    key={name}
                                    onClick={() => setSelectedColor(name)}
                                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === name
                                        ? "border-[#B88E2F]"
                                        : "border-transparent"
                                        }`}
                                    style={{ backgroundColor: code }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Quantity + Buttons */}
                    <div className="flex items-center gap-4 mb-10">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={() => handleQuantity("decrease")}
                                className="px-3 py-2 text-xl"
                            >
                                <FiMinus />
                            </button>
                            <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                            <button
                                onClick={() => handleQuantity("increase")}
                                className="px-3 py-2 text-xl"
                            >
                                <FiPlus />
                            </button>
                        </div>

                        <button
                            onClick={() => {
                                addToCart({
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    img: selectedImage,
                                    slug: product.slug,
                                    quantity: 1,
                                });

                                setAdded(true);
                                setShowToast(true);

                                setTimeout(() => setAdded(false), 1500);
                            }}
                            className={`px-8 py-3 border border-black rounded-md font-medium flex items-center gap-2 transition-all ${added
                                ? "bg-green-600 text-white border-green-600 scale-95"
                                : "hover:bg-[#B88E2F] hover:text-white"
                                }`} >
                            {added ?
                                <>
                                    <CheckIcon /> Added!
                                </> : "Add to cart"}
                        </button>

                        {showToast && <Toast message={`${product.name} added to cart!`} />}

                        <WishlistButton
                            product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                img: product.images[0],
                                slug: product.slug,
                            }}
                            size="lg"
                        />



                        <button className="px-8 py-3 border border-black text-black font-medium rounded-md hover:bg-[#B88E2F] hover:text-white transition-all">
                            + Compare
                        </button>
                    </div>

                    {/* Bottom Info */}
                    <div className="border-t border-gray-200 pt-6 space-y-2 text-gray-600 text-sm">
                        <p>
                            <span className="font-medium text-black">SKU:</span> {product.sku}
                        </p>
                        <p>
                            <span className="font-medium text-black">Category:</span>{" "}
                            {product.category}
                        </p>
                        <p>
                            <span className="font-medium text-black">Tags:</span>{" "}
                            {product.tags.join(", ")}
                        </p>
                        <div className="flex items-center gap-4">
                            <p className="font-medium text-black">Share:</p>
                            <div className="flex gap-3 text-black text-lg">
                                <FaFacebookF className="cursor-pointer hover:text-[#B88E2F]" />
                                <FaLinkedinIn className="cursor-pointer hover:text-[#B88E2F]" />
                                <FaTwitter className="cursor-pointer hover:text-[#B88E2F]" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
