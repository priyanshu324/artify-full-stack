"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { products } from "@/src/data/products";

const RelatedProducts = () => {
    const { slug } = useParams();
    const currentProduct = products.find((p) => p.slug === slug);

    if (!currentProduct) return null;

    // 🎯 Filter related products:
    // - Same category
    // - Exclude current product
    const related = products
        .filter(
            (p) => p.category === currentProduct.category && p.slug !== slug
        )
        .slice(0, 4); // Show only 4

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-semibold text-[#3A3A3A] mb-12">
                    Related Products
                </h2>

                {/* If no related products */}
                {related.length === 0 && (
                    <p className="text-gray-500">No related products found.</p>
                )}

                {/* Dynamic Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {related.map((product) => (
                        <Link
                            href={`/shop/${product.slug}`}
                            key={product.id}
                            className="relative bg-[#F4F5F7] rounded-md overflow-hidden shadow-sm hover:shadow-lg transition-all block"
                        >
                            {/* Image */}
                            <div className="relative">
                                <Image
                                    src={product.img}
                                    alt={product.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-[300px] object-cover"
                                />

                                {/* Discount / New Badge */}
                                {product.tag && (
                                    <span
                                        className={`absolute top-3 right-3 ${product.tag === "new"
                                                ? "bg-[#2EC1AC]"
                                                : "bg-[#E97171]"
                                            } text-white text-xs font-semibold px-3 py-1 rounded-full`}
                                    >
                                        {product.discount || "New"}
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-6 text-left">
                                <h3 className="text-lg font-semibold text-[#3A3A3A]">
                                    {product.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-2">
                                    {product.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-bold text-[#3A3A3A]">
                                        Rp {product.price.toLocaleString("id-ID")}
                                    </span>
                                    {product.oldPrice && (
                                        <span className="text-gray-400 text-sm line-through">
                                            Rp {product.oldPrice.toLocaleString("id-ID")}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Show More Button */}
                <div className="mt-10">
                    <Link
                        href="/shop"
                        className="border border-[#B88E2F] text-[#B88E2F] px-8 py-3 rounded-md font-semibold hover:bg-[#B88E2F] hover:text-white transition-all"
                    >
                        Show More
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
