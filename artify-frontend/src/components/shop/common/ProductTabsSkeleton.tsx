"use client";

import { Skeleton } from "../../ui/Skeleton";


const ProductTabsSkeleton = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">

                <div className="flex justify-center gap-20 border-b pb-4 mb-10">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-32" />
                </div>

                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-4/5 mb-4" />
                <Skeleton className="h-64 w-full mb-4" />
                <Skeleton className="h-64 w-full" />
            </div>
        </section>
    );
};

export default ProductTabsSkeleton;