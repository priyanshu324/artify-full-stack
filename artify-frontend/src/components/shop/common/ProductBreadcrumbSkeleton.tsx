"use client";

import { Skeleton } from "../../ui/Skeleton";


const ProductBreadcrumbSkeleton = () => {
    return (
        <div className="bg-[#F9F1E7] py-10 text-center">
            <Skeleton className="h-10 w-56 mx-auto mb-3" />
            <Skeleton className="h-4 w-80 mx-auto" />
        </div>
    );
};

export default ProductBreadcrumbSkeleton;