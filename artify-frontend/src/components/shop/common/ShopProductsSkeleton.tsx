"use client";

import { Skeleton } from "../../ui/Skeleton";


const ShopProductsSkeleton = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="w-full h-[350px]" />
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-5 w-28" />
                    </div>
                ))}

            </div>
        </section>
    );
};

export default ShopProductsSkeleton;