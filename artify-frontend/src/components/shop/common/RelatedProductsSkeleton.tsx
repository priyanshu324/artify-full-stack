"use client";

import { Skeleton } from "../../ui/Skeleton";


const RelatedProductsSkeleton = () => {
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <Skeleton className="h-10 w-56 mx-auto mb-12" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-[#F4F5F7] rounded-md overflow-hidden shadow-sm p-4"
                        >
                            <Skeleton className="w-full h-[300px] mb-4" />
                            <Skeleton className="h-5 w-40 mb-2" />
                            <Skeleton className="h-4 w-28 mb-1" />
                            <Skeleton className="h-5 w-24" />
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <Skeleton className="h-12 w-40 mx-auto" />
                </div>
            </div>
        </section>
    );
};

export default RelatedProductsSkeleton;