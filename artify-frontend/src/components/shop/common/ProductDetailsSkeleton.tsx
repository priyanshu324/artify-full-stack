"use client";

import { Skeleton } from "../../ui/Skeleton";


const ProductDetailsSkeleton = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-12">

                {/* Left Side (Gallery) */}
                <div className="flex gap-6 flex-1">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-4">
                        <Skeleton className="w-20 h-20" />
                        <Skeleton className="w-20 h-20" />
                        <Skeleton className="w-20 h-20" />
                        <Skeleton className="w-20 h-20" />
                    </div>

                    {/* Main Image */}
                    <Skeleton className="flex-1 h-[500px]" />
                </div>

                {/* Right Side (Details) */}
                <div className="flex-1 space-y-5">
                    <Skeleton className="h-10 w-56" />
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-48" />

                    <Skeleton className="h-28 w-full" />

                    {/* Sizes */}
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-16" />
                        <Skeleton className="h-10 w-16" />
                        <Skeleton className="h-10 w-16" />
                    </div>

                    {/* Colors */}
                    <div className="flex gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>

                    {/* Quantity + Buttons */}
                    <div className="flex gap-5">
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-12 w-32" />
                        <Skeleton className="h-12 w-32" />
                    </div>

                    {/* Bottom info */}
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-5 w-52" />
                    <Skeleton className="h-5 w-48" />
                </div>
            </div>
        </section>
    );
};

export default ProductDetailsSkeleton;