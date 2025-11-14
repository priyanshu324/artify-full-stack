"use client";

import { Skeleton } from "../../ui/Skeleton";


const ShopFilterBarSkeleton = () => {
    return (
        <div className="bg-[#F9F1E7] py-4 px-6 flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-40" />
        </div>
    );
};

export default ShopFilterBarSkeleton;
