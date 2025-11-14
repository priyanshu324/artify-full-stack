"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { productTabsData } from "@/src/data/productTabsData";

// ⏳ Skeleton Component
const SkeletonBox = ({ height }: { height: string }) => (
    <div
        className={`w-full ${height} rounded-md bg-gray-200 animate-pulse`}
    ></div>
);

const ProductTabs: React.FC = () => {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState<
        "description" | "info" | "reviews"
    >("description");

    const [isLoading, setIsLoading] = useState(true);

    // Load data based on slug
    const productTabs = productTabsData[slug as string];

    // Simulate data fetch + smooth UX transition
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [activeTab]);

    if (!productTabs) {
        return (
            <div className="text-center py-20 text-gray-500">
                No details found for this product.
            </div>
        );
    }

    const { description, info, reviews } = productTabs;

    return (
        <section className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4 text-center">
                {/* Tabs */}
                <div className="flex justify-center gap-10 md:gap-20 text-lg font-medium mb-10 border-b border-gray-200 pb-4">
                    {[
                        { id: "description", label: "Description" },
                        { id: "info", label: "Additional Information" },
                        { id: "reviews", label: `Reviews [${reviews.length}]` },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() =>
                                setActiveTab(tab.id as "description" | "info" | "reviews")
                            }
                            className={`transition-colors ${activeTab === tab.id
                                    ? "text-black border-b-2 border-black pb-2"
                                    : "text-gray-400 hover:text-black"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Loader */}
                {isLoading && (
                    <div className="max-w-5xl mx-auto">
                        <SkeletonBox height="h-6 mb-4" />
                        <SkeletonBox height="h-6 mb-4" />
                        <SkeletonBox height="h-[300px] mb-4" />
                        <SkeletonBox height="h-[300px]" />
                    </div>
                )}

                {/* Actual Content */}
                {!isLoading && (
                    <div className="fade-in">
                        {/* Description */}
                        {activeTab === "description" && (
                            <div className="text-gray-600 text-base leading-relaxed max-w-5xl mx-auto">
                                {description.paragraphs.map((text, index) => (
                                    <p key={index} className="mb-6">
                                        {text}
                                    </p>
                                ))}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {description.images.map((img, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#F9F1E7] rounded-lg flex items-center justify-center"
                                        >
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                width={500}
                                                height={350}
                                                className="rounded-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Additional Info */}
                        {activeTab === "info" && (
                            <div className="text-gray-600 max-w-3xl mx-auto">
                                <p className="mb-4">
                                    <span className="font-semibold text-black">Material:</span>{" "}
                                    {info.material}
                                </p>
                                <p className="mb-4">
                                    <span className="font-semibold text-black">Dimensions:</span>{" "}
                                    {info.dimensions}
                                </p>
                                <p className="mb-4">
                                    <span className="font-semibold text-black">Weight:</span>{" "}
                                    {info.weight}
                                </p>
                                <p>
                                    <span className="font-semibold text-black">Care:</span>{" "}
                                    {info.care}
                                </p>
                            </div>
                        )}

                        {/* Reviews */}
                        {activeTab === "reviews" && (
                            <div className="max-w-3xl mx-auto text-gray-600">
                                <h3 className="text-xl font-semibold mb-4">
                                    Customer Reviews ({reviews.length})
                                </h3>

                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <div
                                            key={review.id}
                                            className="mb-4 border-b border-gray-100 pb-3"
                                        >
                                            <p className="text-yellow-500 mb-1">
                                                {"⭐".repeat(review.rating)}{" "}
                                                <span className="text-gray-400 text-sm">
                                                    ({review.rating}/5)
                                                </span>
                                            </p>
                                            <p className="text-gray-500">{review.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
                                        No reviews yet. Be the first to share your experience!
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Smooth fade effect */}
            <style>{`
        .fade-in {
          animation: fadeIn .4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </section>
    );
};

export default ProductTabs;
