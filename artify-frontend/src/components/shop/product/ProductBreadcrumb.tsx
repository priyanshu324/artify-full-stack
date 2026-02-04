"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";
import { products } from "@/src/data/products";

const ProductBreadcrumb = () => {
    const { slug } = useParams();
    const product = products.find((p) => p.slug === slug);

    return (
        <section className="relative bg-[#F9F1E7] py-12 pt-24 px-6 text-center">
            {/* Overlay Content */}
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-black mb-4">
                    {product ? product.name : "Product Details"}
                </h1>

                <p className="text-gray-700 flex items-center justify-center gap-2 text-sm">
                    <Link href="/" className="text-black font-semibold hover:text-[#B88E2F]">
                        Home
                    </Link>
                    <FiChevronRight className="text-black w-4 h-4" />
                    <Link href="/shop" className="text-black font-semibold hover:text-[#B88E2F]">
                        Shop
                    </Link>
                    {product && (
                        <>
                            <FiChevronRight className="text-black w-4 h-4" />
                            <span className="text-gray-500">{product.name}</span>
                        </>
                    )}
                </p>
            </div>
        </section>
    );
};

export default ProductBreadcrumb;
